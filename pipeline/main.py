#!/usr/bin/env python3
import requests
import websockets
import asyncio

BASE_URL = 'https://api.stockfighter.io/ob/api/venues/'
ACCOUNT_ID = ''

#     endpoints.venue         ->    Requires a stock exchange name
#     endpoints.stocks        ->    Requires a stock exchange name
#     endpoints.orderbook     ->    args[0] := exchange name
#                                   args[1] := ticker symbol
#     endpoints.stock_orders  ->    args[0] := exchange name
#                                   args[1] := account identifier
#                                   args[2] := ticker symbol
endpoints = {
    'heartbeat' : '/heartbeat',
    'venue' : lambda exchange: exchange + '/heartbeat',
    'stocks' : lambda exchange: exchange + '/stocks',
    'orderbook': lambda args: args[0] + '/stocks/' + args[1],
    'stock_orders': lambda args: args[0] + '/accounts/' + args[1] + '/stocks/' + args[2]
}


def url_builder(endpoint: str, *args):
    if args:
        return BASE_URL + endpoints[endpoint](args)
    return BASE_URL + endpoints[endpoint]


# url = url_builder('orderbook', 'TESTEX', 'FOOBAR')
# r = requests.get(url)
# print(r.json())

@asyncio.coroutine
def hello(exchange: str):
    url = 'wss://api.stockfighter.io/ob/api/ws/' + ACCOUNT_ID + '/venues/' + exchange + '/tickertape'
    sock = yield from websockets.connect(url)
    while True:
        msg = yield from sock.recv()
        if msg is None:
            break
        yield from prnt(msg)


f = open('out2.json', 'w')
f.write('[')

async def prnt(msg):
    f.write(msg)
    f.write(',\n')
    print(msg)


asyncio.get_event_loop().run_until_complete(hello())
