express=require('express'),app=express();
http=require('http'),server=http.createServer(app);
socketio=require('socket.io'),io=socketio(server);
morgan=require('morgan');

app.use(morgan('combined'));
app.use(express.static('public'));

/* websocket handlers */

io.on('connection',function(socket)
{
	socket.on('chatmsg',function(msg)
	{
		io.emit('chatmsg',msg);
	});
});

server.listen(3000);

