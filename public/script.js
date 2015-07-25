addMessage=(function(data)
{
	var area=document.getElementById('chatarea');

	var time=new Date(data.time);

	var datestring=["x"+time.getDate(),time.getMonth()+1,time.getYear()+1900].join('-x').replace(/x+(?=\d{2})/g,'').replace(/x/g,'0');
	var timestring=["x"+time.getHours(),time.getMinutes(),time.getSeconds()].join(":x").replace(/x+(?=\d{2})/g,'').replace(/x/g,'0');

	var messagestring="("+datestring+" "+timestring+") "+data.user+': '+data.message;

	area.textContent=messagestring+"\n"+area.textContent;

	if(document.hidden)
	{
		document.title=document.title.toUpperCase();
	}
});

sendMessage=(function()
{
	var msg=document.getElementById('messageinput');
	var user=document.getElementById('usernameinput');
	if(!user.value.length)
	{
		alert('no username');
		return;
	}
	if(!msg.value.length)
	{
		return;
	}
	socket.emit('chatmsg',
	{
		time:new Date(),
		user:user.value,
		message:msg.value
	});
	localStorage.username=user.value;
	msg.value="";
});

document.addEventListener('DOMContentLoaded',function()
{
	socket=io();
	document.getElementById('usernameinput').value=localStorage.username||"";
	messages=JSON.parse(localStorage.messages||"[]");
	messages.forEach(addMessage);

	document.addEventListener('visibilitychange',function()
	{
		if(!document.hidden)
		{
			document.title=document.title.toLowerCase();
		}
	});
	socket.on('chatmsg',function(data)
	{
		addMessage(data);

		messages=JSON.parse(localStorage.messages);

		if(messages.push(data)>100)
		{
			messages.shift();
		}

		localStorage.messages=JSON.stringify(messages);
	});
});

