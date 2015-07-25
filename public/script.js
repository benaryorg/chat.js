document.addEventListener('DOMContentLoaded',function()
{
	socket=io();
	document.getElementById('usernameinput').value=localStorage.username||"";
	document.addEventListener('visibilitychange',function()
	{
		if(!document.hidden)
		{
			document.title=document.title.toLowerCase();
		}
	});
	socket.on('chatmsg',function(data)
	{
		var area=document.getElementById('chatarea');
		area.textContent=data+"\n"+area.textContent;

		if(document.hidden)
		{
			document.title=document.title.toUpperCase();
		}
	});
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
	socket.emit('chatmsg',user.value+': '+msg.value);
	localStorage.username=user.value;
	msg.value="";
});

