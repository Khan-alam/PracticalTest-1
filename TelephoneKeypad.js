(function($){
 $.fn.keypad=function(options){
   var options=$.extend({width:300,height:220},options);
   var ele=this;
   var map_text={}; // Store Alphabet and Numbers
   var pressTimer; // Button Pressing Timer
   var isLong=0;  
   var target={

    // Alphabet store in Map text function start
         init:function(){
           map_text={
             "1":". , !","2":"a b c","3":"d e f",
             "4":"g h i","5":"j k l","6":"m n o",
             "7":"p q r s","8":"t u v","9":"w x y z",
             "10":"*","11":"0","12":"#"
           };
        },
   // Alphabet store in Map text function End

   // Function to create input textbox and create button Start
        markup:function(){
          var input=document.createElement("INPUT");
          input.style.display="block";
          input.style.width=options.width-25+"px";
          input.style.height="20px";
          input.style.margin="0px 0px 5px 0px";
          input.style.padding="0px";
          input.style.fontSize="15px";
          ele.append(input);
          ele.css({"width":options.width,"height":options.height,"display":"block"});
          for(var key in map_text){
            var button=document.createElement("BUTTON");
            button.style.display="inline-block";
            button.style.height=(options.height/3)-10+"px";
            button.style.width=(options.width/3)-10+"px";
            var fontSize=((options.width/4)-5)/6;
            button.style.margin="2px 2px";
            button.style.fontSize=fontSize+"px";
            button.setAttribute("data-value",key);
            button.innerHTML=map_text[key];
            $(ele).append(button);
          }
        }
   // Function to create input textbox and create button End

   };
  target.init();    
  target.markup();

  // Button mouseup Function Start
  $(ele).find("button").mouseup(function(event){
            clearTimeout(pressTimer);
            if (isLong==1) {
              isLong=0;
            }else{
              var button_val=$(event.currentTarget).attr("data-value");
              $(ele).children("input").val(inputmessage($(ele).children('input').val(),button_val));
            }
            
            
  });
  // Button mouseup Function End

  // Button mousedown Function Start
  $(ele).find("button").mousedown(function(event){
            var button_val=$(event.currentTarget).attr("data-value");
            pressTimer = window.setTimeout(function() {
              $(ele).children("input").val(ggg($(ele).children('input'),button_val)); 
              // return false;
              isLong=1;
              // alert('d');
            },1000);
            //$(ele).children("input").val(ggg($(ele).children('input').val(),button_val));
  });
   // Button mousedown Function End

// Function to Print Alphabet text Start
  function inputmessage(text,button_pressed){
    if($("#time").length)
    {  
      var currenttime=+new Date();
      var diff=currenttime-$("#time").val();
      document.getElementById("time").value=currenttime;
    }
    else
    {
      var inp=document.createElement("INPUT");
      inp.setAttribute("type","hidden");
      inp.setAttribute("id","time");
      inp.setAttribute("value",+new Date());
      document.body.appendChild(inp);
    }
    var str=$(event.currentTarget).text();
    str=str.split(" ");
    var i=0;

    if(diff && diff>3000)
     return text+str[i];
   if(button_pressed!=0 && button_pressed<=9)
   {

     if(!diff||diff<1500)
     {
      if(text[text.length-1]==str[i])
      {
       text=text.split('');
       text.pop();
       var arr=text.join('');
       text=arr+str[i+1];  
     }
     else if(text[text.length-1]==str[i+1])
     {
       text=text.split('');
       text.pop();
       var arr=text.join('');
       text=arr+str[i+2];  
     }
     else if(text[text.length-1]==str[i+2]&&str.length==4)
     {
       text=text.split('');
       text.pop();
       var arr=text.join('');
       text= arr+str[i+3];  
     }
     else  if(text[text.length-1]==str[i+2]||text[text.length-1]==str[i+3])
     {
       text=text.split('');
       text.pop();
       var arr=text.join('');
       text=arr+str[i];
     }
     else
      text=text+str[i];
  }
  else
  {
    text=text+str[i];    
  }
}
else
  text=text+$(event.currentTarget).text();
return text;
}

// Function to Print Alphabet text End

// Function to Print Num button on LongPress start 
function ggg(text,button_pressed){
  dd = $(text).val();
  $(text).val(dd+button_pressed);

  return dd+button_pressed;
  alert(dd+button_pressed);
}
// Function to Print Num button on LongPress End

return target;  
};
}(jQuery));
