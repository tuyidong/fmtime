window.onload=function()
{
	function getByClass(oParent,sclass)
    {
	   var aResult=[];
	   var aEle=oParent.getElementsByTagName('*');
	   for(var i=0;i<aEle.length;i++)
	   {
		   if(aEle[i].className==sclass)
		   { 
			   aResult.push(aEle[i]);  
		   }
	 }
	return aResult;
    };
	//鼠标移入输入框 搜索按钮变化
   document.getElementById('search_text').onfocus=function()
   {
	   document.getElementById('search_pre').style.display='block';
	   document.getElementById('search_button').style.background='url(i/topbar.png) no-repeat -343px -107px';
	 /*搜索栏ajax*/
	  var searchTxt="";
	  function searchPRE (){
		 searchTxt=document.getElementById('search_text').value;
		  $.ajax({
			 type:'get',
			 url:"http://service.channel.mtime.com/Search.api?Ajax_CallBack=true&Ajax_CallBackType=Mtime.Channel.Services&Ajax_CallBackMethod=GetSuggestObjs&Ajax_CrossDomain=1&Ajax_RequestUrl=http%3A%2F%2Fwww.mtime.com%2F&t=201621721273116426&Ajax_CallBackArgument0="+searchTxt,
			 dataType:'script',
			 jsonp:"callback",
			 success:function(data)
			 {
				document.getElementById('search_pre').innerHTML='';
			    eval(data);
				var ax=GetSuggestObjsResult.value.objs;
				var spUL = document.createElement('UL');
				document.getElementById("search_pre").appendChild(spUL);
				for(i=0;i<ax.length;i++)
				{
				   var spLI = document.createElement('li');
				   var spA=document.createElement('a');
				   spA.href=ax[i].moviepage;
				   var spIMG=document.createElement('img');
				   spIMG.src=ax[i].cover;
				   var spH3=document.createElement('h3');
				   spH3.innerHTML=ax[i].titlecn;
				   var spP=document.createElement('p');
				   spP.innerHTML='导演:'+ax[i].director;
				   spUL.appendChild(spLI);
				   spLI.appendChild(spA);
				   spA.appendChild(spIMG);
				   spA.appendChild(spH3);
				   spA.appendChild(spP);
				}
				   var spA2=document.createElement('a');
				   spA2.innerHTML='查看全部的'+searchTxt+'电影';
				   spA2.href='http://search.mtime.com/search/?q='+searchTxt+'&t=0'; 
				   spA2.className='spClickMore';
				   spUL.appendChild(spA2); 
			 },
		  });
	  }
		
          searchTxt=document.getElementById('search_text').value;
		  setInterval(function(){
			  var searchTxt2=document.getElementById('search_text').value;
			  if (searchTxt==searchTxt2)
			  { return null}
			  else
			  {  searchPRE ();
                                                     searchTxt=searchTxt2; }
		},30);

	  //使用两个定时器来判断，搜索框中的内容是否发生改变
	
	   
   };
 /*  document.getElementById('search_pre').onmouseup=function()
   {
	  document.getElementById('search_pre').style.display='none';   
   };*/
   document.getElementById('search_text').onblur=function()
   {
	   document.getElementById('search_button').style.background='url(i/topbar.png) no-repeat -1px -111px';
	  document.getElementById('search_pre').style.display='none';
   };
      /*搜索栏ajax*/	 
	  
	  /*点击搜索图标搜索*/
	  document.getElementById('search_button').onclick=function()
	  {
		 var searchTxt3=document.getElementById('search_text').value;
		 window.open('http://search.mtime.com/search/?q='+searchTxt3+'&t=0',"_blank");
	  }; 
	   document.onkeydown=function(event){
            var e = event || window.event || arguments.callee.caller.arguments[0];
             if(e && e.keyCode==13)
			 { // enter 键要做的事情
			   var searchTxt3=document.getElementById('search_text').value;
		 window.open('http://search.mtime.com/search/?q='+searchTxt3+'&t=0',"_blank"); 
             }
        };                   
   
   //鼠标点击“全部” 显示选择项目,
   var search_all=document.getElementById('selctsearch');
   var search_select=document.getElementById('selctshow');
   var search_aLi=search_select.getElementsByTagName('ul')[0].getElementsByTagName('li');
   search_all.onclick=function()
   {
	   if(search_select.style.display=='none')
	   {
	      search_select.style.display='block';
	      search_all.getElementsByTagName('div')[0].style.background='url(i/topbar.png) no-repeat -381px -352px';
	   }
	   else
	   {
	      search_select.style.display='none';
	      search_all.getElementsByTagName('div')[0].style.background='url(i/topbar.png) no-repeat -381px -339px';
	   } 
   };
   for(var i=0; i<search_aLi.length;i++)
   {
	  search_aLi[i].onclick=function()
	  {
		 search_all.getElementsByTagName('strong')[0].innerText=this.innerText;
		 search_select.style.display='none';
	  };
   }

//大图随窗口变化调整
   var pic_big=document.getElementById('big_pic_a').getElementsByTagName('li');
   var Wonresize=function(){
	  var windowx =document.documentElement.clientWidth;
	  for(var n=0; n<pic_big.length;n++)
	  {
		 pic_big[n].style.left=-(1920-windowx)/2+'px';
		 pic_big[n].style.width=windowx-pic_big[n].offsetLeft+'px';

	  }
	  /*document.getElementById('index_shadow').style.left=(windowx-1022)/2+'px';*/
   };
   Wonresize();
   
    window.onresize=function(){ Wonresize();};
   
   
//大图切换效果 
   var aImg_a=document.getElementById('big_pic_a').getElementsByTagName('li');
   var aBtn_prew=document.getElementById('pre_img');
   var aBtn_next=document.getElementById('next_img');
   var now=0;
   
   aBtn_prew.onmouseover=aBtn_next.onmouseover=function()
   {
	   starMove(aBtn_prew,{opacity:80},starMove(aBtn_next,{opacity:80}));
   };
   aBtn_prew.onmouseout=aBtn_next.onmouseout=function()
   {
	   starMove(aBtn_prew,{opacity:40},starMove(aBtn_next,{opacity:40}));
   };
   
	  function tab()
	  {
		 for(var m=0;m<aImg_a.length;m++)
		 {
			if(now==0)
			{ return;}
			else{starMove(aImg_a[m],{opacity:0});
			aImg_a[m].style.zIndex=0;}
		 }
	  }
	  aBtn_next.onclick=function()
	  {
		 tab();
	     now++;
		 if(now==5)
		 {now=0;}
		 starMove(aImg_a[now],{opacity:100});
		 aImg_a[now].style.zIndex=1;                                           
	  };
	  aBtn_prew.onclick=function()
	  {
		 tab();
	     now--;
		 if(now==-1)
		 {now=4;}
		 starMove(aImg_a[now],{opacity:100});
		 aImg_a[now].style.zIndex=1;                                                    
	  };
	  setInterval(aBtn_next.onclick,3000);
	  
 /**/
	 var abc=document.getElementById('today_news_d').getElementsByTagName('ul')[0];
	 var abcd=abc.getElementsByTagName('li');
	 
	 abc.style.width=abcd[i].offsetWidth*(abcd.length)+'px';
     
	 var oBtn_left=document.getElementById('oBtn_left_class');
	 var oBtn_right=document.getElementById('oBtn_right_class');
	 
	 oBtn_right.onclick=function()
	 {
        /*abc.style.left=abc.offsetLeft-750+'px';*/
		
		var tt=abc.offsetLeft;
		if(tt==0||tt==-750||tt==-1500)
		{  
		   starMove(abc,{left:abc.offsetLeft-750});
		   if(abc.offsetLeft==0)
		   {
			   oBtn_left.style.display='block';
		   }
		   else if(abc.offsetLeft==-750)
		   { 
			  oBtn_left.style.display='block';
			  oBtn_right.style.display='none';}
		   else
		   {oBtn_left.style.display='none';}
		}
		else return;
	 };
	 oBtn_left.onclick=function()
	 {
        /*abc.style.left=abc.offsetLeft+750+'px';*/
		var tt=abc.offsetLeft;
		if(tt==0||tt==-750||tt==-1500)
		{
		   starMove(abc,{left:abc.offsetLeft+750},false);
		   if(abc.offsetLeft==-1500)
		   {
			   oBtn_right.style.display='block';
		   }
		   else if(abc.offsetLeft==-750)
		   { 
			  oBtn_left.style.display='none';
			  oBtn_right.style.display='block';}
			else
		   {oBtn_right.style.display='none';}
		}
		else return; 
	 };
	/**/
	 var ac=$('.movie_pic_choose_ul').find('li').eq(1).outerWidth(true);
	 var acLength=$('.movie_pic_choose_ul').find('li').length;
	 $('.movie_pic_choose_ul').css({width:ac*acLength+'px'});
     
	 $('#oBtn_right_class_b').click(function()
	      {
		     var acLeft=$('.movie_pic_choose_ul').css('left');
			 var xz=$('.movie_pic_choose_ul').offset().left-714.5;
			  if(xz==-1290||xz<-1290)
			  {
				$('.movie_pic_choose_ul').animate({left:-ac*acLength+696},'3000');
				$('#oBtn_right_class_b').css('display','none');
				$('#oBtn_left_class_b').css('display','block');
			  }
			  else
			  {
				$('#oBtn_right_class_b').css('display','block');
				$('#oBtn_left_class_b').css('display','block');
                $('.movie_pic_choose_ul').animate({left:xz-ac*4},'3000');
			  }
		  }
	  );
	  
	 $('#oBtn_left_class_b').click(function()
	      {
		     var acLeft=$('.movie_pic_choose_ul').css('left');
			 var xz=$('.movie_pic_choose_ul').offset().left-393.5;
			 if(xz==-438||xz>-438)
			 { 
			    $('.movie_pic_choose_ul').animate({left:0},'3000');
				$('#oBtn_right_class_b').css('display','block');
				$('#oBtn_left_class_b').css('display','none');
			 }
			 else
			 {
                $('.movie_pic_choose_ul').animate({left:xz+ac*4},'3000');
			    $('#oBtn_right_class_b').css('display','block');
				$('#oBtn_left_class_b').css('display','block');
			 }
		  }
	  );

/*点击重庆弹出选择*/	   
	  $(".movie_now_select_add").click
	  (
	     function()
		 {
			
		    if($(".movie_now_select_add_form").css('display')=='none')
			{
		       $(".movie_now_select_add_form").css('display','block');
			}
			else
			{
			   $(".movie_now_select_add_form").css('display','none');
			}
		 }
	  );
/*点击重庆弹出选择*/

/*地址选择图标移动*/
    var addLi=$('.movie_add_nov').find('ul').find('li');
	
    /*$(".movie_add_all").*/
	addLi.mouseover
	(
	   function()
	   {
		   var bc=$(this).index();
		   
		  $(".three_i").animate({left:bc*50+27},60);
	   }
	);
	var bd=0;
	addLi.click
	(
	   function()
	   {
		  bd=$(this).index();
		  for(var i=0;i<5;i++)
		  {
		     $(".movie_add_all").eq(i).css('display','none');
		  }
	      $(".movie_add_all").eq(bd).css('display','block');
		  $(".three_i").animate({left:bd*50+27},60);
	   }
	);
	
	/*alert($('.movie_now_select_add').find('h3').html());
  	alert($('.movie_add_all').find('li').length);*/
    $('.movie_add_all').find('li').click
	(
	   function()
	   {
	     $('.movie_now_select_add').find('h3').text($(this).text());
		 $(".movie_now_select_add_form").css('display','none');
		 if($('#movie_now_select_add').text()=='北京')
	     {
           cityNO='290';
	     }
		 if($('#movie_now_select_add').text()=='深圳')
		 {
			cityNO='366';
		 }
		 MovieName();//变更地址后对选择影片重新进行加载
		 ADDName();//变更地址后对选择影院地址重新进行加载
	   }
	);
	var cityNO;
	if($('#movie_now_select_add').text()=='重庆')
	{
       cityNO='291';
	}
	
	

/*点击电影选择电影*/
    $("#movie_now_select_movie").click
	  (
	     function()
		 {
			
		    if($(".movies_choose_scelet").css('display')=='none')
			{
		       $(".movies_choose_scelet").css('display','block');
			}
			else
			{
			   $(".movies_choose_scelet").css('display','none');
			}
		 }
	  );
	  MovieName();
	  function MovieName(){
		   $.ajax({
              type:"get",
			  url:'http://service.theater.mtime.com/Cinema.api?Ajax_CallBack=true&Ajax_CallBackType=Mtime.Cinema.Services&Ajax_CallBackMethod=GetOnlineMoviesInCity&Ajax_CrossDomain=1&Ajax_RequestUrl=http%3A%2F%2Fwww.mtime.com%2F&t=201621921311473991&Ajax_CallBackArgument0='+cityNO,
			  dataType:'script',
			  jsonp:"callback",	
			  success:function(data)
			  {
				 eval(data);
				  document.getElementById('movies_choose_name').innerHTML='';
				 var Adata=getOnlineMoviesInCityResult.value.movies;
				 for(var i=0; i<Adata.length;i++)
				 {
					 var bLI=document.createElement('li');
				     var bP=document.createElement('p');
					 bP.innerHTML=Adata[i].title;
					 bLI.appendChild(bP);
					 var bI=document.createElement('i');
					 bI.innerHTML=Adata[i].rating;
					 bLI.appendChild(bI);
					 document.getElementById('movies_choose_name').appendChild(bLI);
					
					 bLI.value=Adata[i].movieId;
				 }
				  bh();
				 
			  },	      
		   });
		  
	  };
	   var movieID;
	  function bh(){
		    
			var bf=$('.movies_choose_name').find('ul').find('li');
			bf.click( function()
		    {   movieID=$(this).val();
				$('#movie_now_select_movie').find('p').text( $(this).find('p').text());
				$(".movies_choose_scelet").css('display','none');
				$('#movie_now_select_movie').children().not('p').css('display','none');
			 }
			 );
	  };
	  
	  /*选择影院地址*/
	  ADDName();
	  function ADDName(){
		   $.ajax({
              type:"get",
			  url:'http://service.theater.mtime.com/Cinema.api?Ajax_CallBack=true&Ajax_CallBackType=Mtime.Cinema.Services&Ajax_CallBackMethod=GetOnlineTheatersInCity&Ajax_CrossDomain=1&Ajax_RequestUrl=http%3A%2F%2Fwww.mtime.com%2F&t=201621921261060965&Ajax_CallBackArgument0='+cityNO,
			  dataType:'script',
			  jsonp:"callback",	
			  success:function(data)
			  {
				 eval(data);
				 document.getElementById('add_cinema_name').innerHTML='';
				 var CdataDistricts=getGetOnlineTheatersInCityResult.value.districts;
				 var CdatCinemas=getGetOnlineTheatersInCityResult.value.cinemas;
				 
				 $('#cinema_total1').html(CdatCinemas.length);
				 $('#cinema_total2').html(CdatCinemas.length);
				 for(var i=0;i<CdataDistricts.length;i++){
				    var cDIV=document.createElement('div');
					var cH3=document.createElement('h3');
					cH3.value=CdataDistricts[i].districtId;
					cH3.innerHTML=CdataDistricts[i].name;
					
					cDIV.appendChild(cH3);
					 for(var ba=0; ba<CdatCinemas.length;ba++)
						{
						   if(CdatCinemas[ba].districtId==cH3.value)
						   {  
						      var cP=document.createElement('p');
							  cP.innerHTML=CdatCinemas[ba].name;
							  cP.value=CdatCinemas[ba].cinemaId;
							  
				              cDIV.appendChild(cP);
						   }
						   else
						   {
							   continue;
						   }
						   
						}
					document.getElementById('add_cinema_name').appendChild(cDIV);
					
				 }
				
				  chooseADD();
				 
				
				 
			  },	      
		   });
		  
	  };
	  $('#add_now_select_movie').click(function()
	  {
	     if($('.add_choose_scelet').css('display')=='none')
		    {
		       $('.add_choose_scelet').css({display:'block'});
			}
		 else
		 {
		     $('.add_choose_scelet').css({display:'none'});
		 }
	  });
	  var CinemasID;
	   function chooseADD(){
		    
			var bq=$('.add_cinema_name').find('div').find('p');
			bq.click( function()
		    {  CinemasID=$(this).val();
				$('#add_now_select_movie').find('p').text( $(this).text());
				$(".add_choose_scelet").css('display','none');
				$('#add_now_select_movie').children().not('p').css('display','none');

			 }
			 );
	  };
	 

	  /*选择影院地址*/
	  
	  
	  /*选择上映时间*/
	  
	  
	  
	  /*选择上映时间*/

/*end*/	  
	 
	 /*搜索栏ajax*/	  
   
	 /*搜索栏ajax*/	
	
};