
import socket

host = ""
port = 8000
addr = (host, port)
number_of_connections = 5;

server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1) 

server_socket.bind((host, port)) 
server_socket.listen(number_of_connections)

server_socket.listen(10)
print 'aguardando conexao'

con, cliente = server_socket.accept()
print 'conectado'
print "aguardando mensagem" 

while  True:
	received = con.recv(1024)
	msg = raw_input()
	if msg != '':
		server_socket.sendall(msg)
	if received:
		print ">>" + received
	# server_socket.close()