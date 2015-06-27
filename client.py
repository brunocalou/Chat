#!/usr/bin/python 

import socket

client_socket = socket.socket()
host = ''
port = 8000

client_socket.connect(('',port))
while True:
	msg = raw_input()
	client_socket.send(msg)
	if msg != '':
		client_socket.sendall(msg)
	received = client_socket.recv(1024)
	if received:
		print ">>" + received

client_socket.close()