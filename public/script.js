notify=(function(text)
{
	if(!("Notification" in window))
	{
		return;
	}

	if(Notification.permission==='denied')
	{
		return;
	}

	if(Notification.permission==="granted")
	{
		if(text)
		{
			try
			{
				if(!notifications)
				{
					notifications=[];
				}
				notifications.push(new Notification("New Chat Message",{body:text}));
			}
			catch(e)
			{
				if(e.name=='TypeError')
				{
					return;
				}
			}
		}
	}
	else
	{
		Notification.requestPermission(function(permission)
		{
			if(permission==="granted")
			{
				notify(text);
			}
		});
	}
});

addMessage=(function(data)
{
	var area=document.getElementById('chatarea');

	var time=new Date(data.time);

	var datestring=["x"+time.getDate(),time.getMonth()+1,time.getYear()+1900].join('-x').replace(/x+(?=\d{2})/g,'').replace(/x/g,'0');
	var timestring=["x"+time.getHours(),time.getMinutes(),time.getSeconds()].join(":x").replace(/x+(?=\d{2})/g,'').replace(/x/g,'0');

	var messagestring="("+datestring+" "+timestring+") "+data.user+': '+data.message;

	var item=document.createElement("div");
	var textnode=document.createTextNode(messagestring);
	item.appendChild(textnode);
	item.innerHTML=item.innerHTML.replace(/https?:\/\/([-\w_\.]{2,}\.?)+(\/\S*)?/g,function(match)
	{
		return '<a href="'+match+'" target="_blank">'+match+'</a>';
	});

	area.insertBefore(item,area.childNodes[0]);

	if(document.hidden)
	{
		document.title=document.title.toUpperCase();
		notify(data.user+': '+data.message);
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
	notifications=null;
	notify();

	document.getElementById('usernameinput').value=localStorage.username||"";

	if(!localStorage.messages)
	{
		localStorage.messages="[]";
	}
	var messages=JSON.parse(localStorage.messages);
	messages.forEach(addMessage);

	document.addEventListener('visibilitychange',function()
	{
		if(!document.hidden)
		{
			document.title=document.title.toLowerCase();
			if(notifications)
			{
				notifications.forEach(function(n)
				{
					n.close();
				});
				notifications=[];
			}
		}
	});
	socket.on('chatmsg',function(data)
	{
		addMessage(data);

		messages=JSON.parse(localStorage.messages);

		if(messages.push(data)>100)
		{
			messages.shift();
			var area=document.getElementById('chatarea');
			area.removeChild(area.lastChild)
		}

		localStorage.messages=JSON.stringify(messages);
	});
});

