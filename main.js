//遊戲地形
//0:道路, 1:草叢, 2:終點 , 3:哆啦A夢, 4:銅鑼燒
var         Map=[0,0,4,1,0,0,4,0,1,1,
                 0,1,0,1,0,1,1,0,0,4,
                 0,0,0,0,0,0,0,0,1,1,
                 1,0,1,0,1,0,1,0,0,0,
                 0,4,1,0,1,0,1,1,1,0,
                 0,1,1,0,0,0,0,0,1,0,
                 0,0,0,0,1,1,1,0,1,0,
                 0,1,1,0,0,0,0,0,0,0,
                 4,0,1,0,1,1,1,0,1,2,
                 1,0,0,0,0,4,0,0,1,3];

var Initial = Map.slice();
var c,cxt;
var currentImgMainX,currentImgMainY;
var currentEnemyMainX,currentEnemyMainY,currentEnemy2MainX,currentEnemy2MainY;
var targetImgMainX,targetImgMainY,targetLoc;
var mount, ImgMain,ImgEnemy,ImgEnemy2,ImgDora,ImgFood;
var confirmButton,stage;
var isPlaying=false,enemyIsPlaying=true;//是否正在玩
var count=0,gameTime=1;


window.onload=function()
{
    
    alert("遊戲規則 : 幫助哆啦A夢拿回6個銅鑼燒並交給他，不要讓他餓肚子!! 如果遇到胖虎和小夫(每下一關的胖虎和小夫速度會加快)，遊戲就結束了。請按下開始鍵進行遊戲!!");
    
    //使用id來找到Canvas物件
    c=document.getElementById("myCanvas");
    //2d是HTML5內建Object,有許多可使用的方法
    cxt=c.getContext("2d");
    
    //資源
    mount=new Image();
    mount.src="material.png";
    mount.onload=function()
    {
        //前面四個參數代表要剪下圖片的座標與大小，後面四個參數代表在哪個點開始放與縮放程度
    //山
      cxt.drawImage(mount,160,190,32,32,60,60,60,60);
      cxt.drawImage(mount,160,190,32,32,180,0,60,60);
      cxt.drawImage(mount,160,190,32,32,180,60,60,60);
      cxt.drawImage(mount,160,190,32,32,300,60,60,60);
      cxt.drawImage(mount,160,190,32,32,360,60,60,60);
      cxt.drawImage(mount,160,190,32,32,480,0,60,60);
      cxt.drawImage(mount,160,190,32,32,540,0,60,60);
      cxt.drawImage(mount,160,190,32,32,480,120,60,60);
      cxt.drawImage(mount,160,190,32,32,540,120,60,60);
      cxt.drawImage(mount,160,190,32,32,0,180,60,60); 
      cxt.drawImage(mount,160,190,32,32,120,180,60,60); 
      cxt.drawImage(mount,160,190,32,32,120,240,60,60); 
      cxt.drawImage(mount,160,190,32,32,120,300,60,60); 
      cxt.drawImage(mount,160,190,32,32,60,300,60,60); 
      cxt.drawImage(mount,160,190,32,32,240,180,60,60); 
      cxt.drawImage(mount,160,190,32,32,240,240,60,60); 
      cxt.drawImage(mount,160,190,32,32,360,180,60,60); 
      cxt.drawImage(mount,160,190,32,32,360,240,60,60); 
      cxt.drawImage(mount,160,190,32,32,420,240,60,60); 
      cxt.drawImage(mount,160,190,32,32,480,240,60,60);
      cxt.drawImage(mount,160,190,32,32,480,300,60,60); 
      cxt.drawImage(mount,160,190,32,32,240,360,60,60); 
      cxt.drawImage(mount,160,190,32,32,300,360,60,60); 
      cxt.drawImage(mount,160,190,32,32,360,360,60,60);
      cxt.drawImage(mount,160,190,32,32,60,420,60,60); 
      cxt.drawImage(mount,160,190,32,32,120,420,60,60); 
      cxt.drawImage(mount,160,190,32,32,120,480,60,60); 
      cxt.drawImage(mount,160,190,32,32,0,540,60,60); 
      cxt.drawImage(mount,160,190,32,32,240,480,60,60);
      cxt.drawImage(mount,160,190,32,32,300,480,60,60); 
      cxt.drawImage(mount,160,190,32,32,360,480,60,60); 
      cxt.drawImage(mount,160,190,32,32,480,360,60,60);    
      cxt.drawImage(mount,160,190,32,32,480,480,60,60);
      cxt.drawImage(mount,160,190,32,32,480,540,60,60); 
          
    };
    
    
    confirmButton=document.getElementById("confirmButton");
    confirmButton.addEventListener("click",start);
    
    stage=document.getElementById("stage");
    window.onkeydown=move;

};

//按下按鈕後，出現銅鑼燒並開始計時
function start(){
     
   
 
    //isPlaying初始值為false,當值為true代表遊戲正在進行
    if(isPlaying){
        alert("遊戲還在進行唷!");
    }else{
        
        
        Map=Initial.slice();
        count=0;
        cxt.clearRect(currentImgMainX,currentImgMainY,60,60);
        
        
        
        //大雄
        ImgMain=new Image();
        ImgMain.src="bear.png";
        currentImgMainX=0;
        currentImgMainY=0;
        ImgMain.onload=function()
        {
           cxt.drawImage(ImgMain,32,0,32,32,currentImgMainX,currentImgMainY,60,60);
        
        };
     
        //多拉A夢
        ImgDora=new Image();
        ImgDora.src="dora.png";
        ImgDora.onload=function()
        {
          cxt.drawImage(ImgDora,32,0,32,32,540,540,60,60);    
        };
        
        //銅鑼燒
        ImgFood=new Image();
        ImgFood.src="food.png";
        ImgFood.onload=function()
        {
              
           cxt.drawImage(ImgFood,0,0,674,324,0,480,60,60); 
           cxt.drawImage(ImgFood,0,0,674,324,60,240,60,60); 
           cxt.drawImage(ImgFood,0,0,674,324,360,0,60,60); 
           cxt.drawImage(ImgFood,0,0,674,324,540,60,60,60); 
           cxt.drawImage(ImgFood,0,0,674,324,300,540,60,60); 
           cxt.drawImage(ImgFood,0,0,674,324,120,0,60,60); 
        
        
        };
        
        //擦掉舊的胖虎
        cxt.clearRect(currentEnemyMainX,currentEnemyMainY,60,60);
        //胖虎
        ImgEnemy=new Image();
        ImgEnemy.src="Enemy.png";
        currentEnemyMainX=420;
        currentEnemyMainY=300;
        ImgEnemy.onload=function()
        {
          cxt.drawImage(ImgEnemy,32,0,32,32,currentEnemyMainX,currentEnemyMainY,60,60);    
        };
        
       
        
        
        //擦掉舊的小夫
        cxt.clearRect(currentEnemy2MainX,currentEnemy2MainY,60,60);
        //小夫
        ImgEnemy2=new Image();
        ImgEnemy2.src="Enemy2.png";
        currentEnemy2MainX=180;
        currentEnemy2MainY=300;
        ImgEnemy2.onload=function()
        {
          cxt.drawImage(ImgEnemy2,32,0,32,32,currentEnemy2MainX,currentEnemy2MainY,60,60);    
        };
        
        
        isPlaying=true;
        enemyIsPlaying=true;
        enemy2IsPlaying=true;
        
    };
        
        
    
        //如果不要讓他每次都減半時間，就寫個boolean判斷
        //胖虎和小夫的移動
        setInterval(enemy1Move,750);
        setInterval(enemy2Move,750);
    
        stage.innerHTML="第"+gameTime+"關";
  
};


function enemy1Move(){
     var enemyImgMainX,enemyImgMainY,enemyLoc;
     enemyLoc=currentEnemyMainX/60+currentEnemyMainY/60*10;
     var a=Math.ceil(Math.random()*4);
    
   if(enemyIsPlaying){
       //胖虎所走的方向有草叢、點心、多拉A夢、邊界就重新產生亂數
     if((currentEnemyMainX==currentImgMainX)&&(currentEnemyMainY==currentImgMainY)){
         //胖虎遇到大雄就結束了
         document.getElementById("talkBox").innerHTML="嘿嘿大雄把銅鑼燒都交出來";
         alert("遊戲結束");
         isPlaying=false;
         enemyIsPlaying=false;
         enemy2IsPlaying=false;
     }else if((a==1 && Map[enemyLoc-10]==1)||(a==2 && (Map[enemyLoc-1]==1||Map[enemyLoc-1]==4))||(a==3 && (Map[enemyLoc+10]==1||Map[enemyLoc+10]==3))||(a==4&& (Map[enemyLoc+1]==1||Map[enemyLoc+1]==4))){
         a=Math.ceil(Math.random()*4);
     }else{
       switch(a)
       {
         //向上
         case 1:
             //現在圖片的位置
             enemyImgMainX=currentEnemyMainX;
             enemyImgMainY=currentEnemyMainY-60;
             
             if(enemyImgMainX<=540 && enemyImgMainX>=0 && enemyImgMainY<=540 && enemyImgMainY>=0)
               {
                   enemyLoc=enemyImgMainX/60+enemyImgMainY/60*10;//胖虎在Map上的第幾格
               }else{
                   enemyLoc=-1;
               }
             
             

             if(enemyLoc==-1){
                 
             }else{   
                   //刪掉舊圖案
                   cxt.clearRect(currentEnemyMainX,currentEnemyMainY,60,60); 
                   currentEnemyMainX=enemyImgMainX;
                   currentEnemyMainY=enemyImgMainY;
                   cxt.drawImage(ImgEnemy,32,96,32,32,enemyImgMainX,enemyImgMainY,60,60);
             };
               
             
             break;    
        //向左     
        case 2:
             enemyImgMainX=currentEnemyMainX-60;
             enemyImgMainY=currentEnemyMainY;
             
             if(enemyImgMainX<=540 && enemyImgMainX>=0 && enemyImgMainY<=540 && enemyImgMainY>=0)
               {
                   enemyLoc=enemyImgMainX/60+enemyImgMainY/60*10;//胖虎在Map上的第幾格
               }else{
                   enemyLoc=-1;
               }
             
             if(enemyLoc==-1){
                 
             }else{   
                   //刪掉舊圖案
                   cxt.clearRect(currentEnemyMainX,currentEnemyMainY,60,60); 
                   currentEnemyMainX=enemyImgMainX;
                   currentEnemyMainY=enemyImgMainY;
                   cxt.drawImage(ImgEnemy,32,32,32,32,enemyImgMainX,enemyImgMainY,60,60);
             };
             break;  
        //向下     
        case 3:
             enemyImgMainX=currentEnemyMainX;
             enemyImgMainY=currentEnemyMainY+60;
             
             if(enemyImgMainX<=540 && enemyImgMainX>=0 && enemyImgMainY<=540 && enemyImgMainY>=0)
               {
                   enemyLoc=enemyImgMainX/60+enemyImgMainY/60*10;//胖虎在Map上的第幾格
               }else{
                   enemyLoc=-1;
               }
             
             if(enemyLoc==-1){
                 
             }else{   
                   //刪掉舊圖案
                   cxt.clearRect(currentEnemyMainX,currentEnemyMainY,60,60); 
                   currentEnemyMainX=enemyImgMainX;
                   currentEnemyMainY=enemyImgMainY;
                   cxt.drawImage(ImgEnemy,32,0,32,32,enemyImgMainX,enemyImgMainY,60,60);
             };
             break; 
        //向右     
        case 4:
             enemyImgMainX=currentEnemyMainX+60;
             enemyImgMainY=currentEnemyMainY;
             
             if(enemyImgMainX<=540 && enemyImgMainX>=0 && enemyImgMainY<=540 && enemyImgMainY>=0)
               {
                   enemyLoc=enemyImgMainX/60+enemyImgMainY/60*10;//在Map上的第幾格
               }else{
                   enemyLoc=-1;
               }
             
             if(enemyLoc==-1){
                 
             }else{   
                   //刪掉舊圖案
                   cxt.clearRect(currentEnemyMainX,currentEnemyMainY,60,60); 
                   currentEnemyMainX=enemyImgMainX;
                   currentEnemyMainY=enemyImgMainY;
                   cxt.drawImage(ImgEnemy,32,65,32,32,enemyImgMainX,enemyImgMainY,60,60);
             };
             break;  
             
       }; 
     };
  };
};

//小夫的移動
function enemy2Move(){
     var enemy2ImgMainX,enemy2ImgMainY,enemy2Loc;
     enemy2Loc=currentEnemy2MainX/60+currentEnemy2MainY/60*10;
     var b=Math.ceil(Math.random()*4);
    
   if(enemy2IsPlaying){
       //小夫所走的方向有草叢、點心、多拉A夢、邊界就重新產生亂數
     if((currentEnemy2MainX==currentImgMainX)&&(currentEnemy2MainY==currentImgMainY)){
         //胖虎遇到大雄就結束了
         document.getElementById("talkBox").innerHTML="嘿嘿大雄把銅鑼燒都交出來";
         alert("遊戲結束");
         isPlaying=false;
         enemyIsPlaying=false;
         enemy2IsPlaying=false;
     }else if((b==1 && Map[enemy2Loc-10]==1)||(b==2 && (Map[enemy2Loc-1]==1||Map[enemy2Loc-1]==4))||(b==3 && (Map[enemy2Loc+10]==1||Map[enemy2Loc+10]==3))||(b==4&& (Map[enemy2Loc+1]==1||Map[enemy2Loc+1]==4))){
         b=Math.ceil(Math.random()*4);
     }else{
       switch(b)
       {
         //向上
         case 1:
             //現在圖片的位置
             enemy2ImgMainX=currentEnemy2MainX;
             enemy2ImgMainY=currentEnemy2MainY-60;
             
             if(enemy2ImgMainX<=540 && enemy2ImgMainX>=0 && enemy2ImgMainY<=540 && enemy2ImgMainY>=0)
               {
                   enemy2Loc=enemy2ImgMainX/60+enemy2ImgMainY/60*10;//胖虎在Map上的第幾格
               }else{
                   enemy2Loc=-1;
               }
             
             

             if(enemy2Loc==-1){
                 
             }else{   
                   //刪掉舊圖案
                   cxt.clearRect(currentEnemy2MainX,currentEnemy2MainY,60,60); 
                   currentEnemy2MainX=enemy2ImgMainX;
                   currentEnemy2MainY=enemy2ImgMainY;
                   cxt.drawImage(ImgEnemy2,32,96,32,32,enemy2ImgMainX,enemy2ImgMainY,60,60);
             };
               
             
             break;    
        //向左     
        case 2:
             enemy2ImgMainX=currentEnemy2MainX-60;
             enemy2ImgMainY=currentEnemy2MainY;
             
             if(enemy2ImgMainX<=540 && enemy2ImgMainX>=0 && enemy2ImgMainY<=540 && enemy2ImgMainY>=0)
               {
                   enemy2Loc=enemy2ImgMainX/60+enemy2ImgMainY/60*10;//胖虎在Map上的第幾格
               }else{
                   enemy2Loc=-1;
               }
             
             if(enemy2Loc==-1){
                 
             }else{   
                   //刪掉舊圖案
                   cxt.clearRect(currentEnemy2MainX,currentEnemy2MainY,60,60); 
                   currentEnemy2MainX=enemy2ImgMainX;
                   currentEnemy2MainY=enemy2ImgMainY;
                   cxt.drawImage(ImgEnemy2,32,32,32,32,enemy2ImgMainX,enemy2ImgMainY,60,60);
             };
             break;  
        //向下     
        case 3:
             enemy2ImgMainX=currentEnemy2MainX;
             enemy2ImgMainY=currentEnemy2MainY+60;
             
             if(enemy2ImgMainX<=540 && enemy2ImgMainX>=0 && enemy2ImgMainY<=540 && enemy2ImgMainY>=0)
               {
                   enemy2Loc=enemy2ImgMainX/60+enemy2ImgMainY/60*10;//胖虎在Map上的第幾格
               }else{
                   enemy2Loc=-1;
               }
             
             if(enemy2Loc==-1){
                 
             }else{   
                   //刪掉舊圖案
                   cxt.clearRect(currentEnemy2MainX,currentEnemy2MainY,60,60); 
                   currentEnemy2MainX=enemy2ImgMainX;
                   currentEnemy2MainY=enemy2ImgMainY;
                   cxt.drawImage(ImgEnemy2,32,0,32,32,enemy2ImgMainX,enemy2ImgMainY,60,60);
             };
             break; 
        //向右     
        case 4:
             enemy2ImgMainX=currentEnemy2MainX+60;
             enemy2ImgMainY=currentEnemy2MainY;
             
             if(enemy2ImgMainX<=540 && enemy2ImgMainX>=0 && enemy2ImgMainY<=540 && enemy2ImgMainY>=0)
               {
                   enemy2Loc=enemy2ImgMainX/60+enemy2ImgMainY/60*10;//在Map上的第幾格
               }else{
                   enemy2Loc=-1;
               }
             
             if(enemy2Loc==-1){
                 
             }else{   
                   //刪掉舊圖案
                   cxt.clearRect(currentEnemy2MainX,currentEnemy2MainY,60,60); 
                   currentEnemy2MainX=enemy2ImgMainX;
                   currentEnemy2MainY=enemy2ImgMainY;
                   cxt.drawImage(ImgEnemy2,32,65,32,32,enemy2ImgMainX,enemy2ImgMainY,60,60);
             };
             break;  
             
       }; 
     };
  };
};



             

function move(e)
{
    //console.log(e.keyCode);   
    
    
    switch(e.keyCode)
    {
        case 83://往下
            targetImgMainX=currentImgMainX;
            targetImgMainY=currentImgMainY+60;
            if(targetImgMainX<=540 && targetImgMainX>=0 && targetImgMainY<=540 && targetImgMainY>=0)
               {
                   targetLoc=targetImgMainX/60+targetImgMainY/60*10;//大雄在Map上的第幾格
               }else{
                   targetLoc=-1;
               }
            cxt.clearRect(currentImgMainX,currentImgMainY,60,60);
            if(targetLoc==-1 || Map[targetLoc]==1 || Map[targetLoc]==3)
               {
                       //已經到地圖最底下或是遇到障礙物，就不可以走
               }else{
                   currentImgMainX=targetImgMainX;
                   currentImgMainY=targetImgMainY;
                   
               }
            
            //給完銅鑼燒，按重新開始後會印出新的大雄
            if(count>6 && Map[targetLoc]==2){
            
            }else{
                cxt.drawImage(ImgMain,32,0,32,32,currentImgMainX,currentImgMainY,60,60);
            };
               break;
            
            
          case 87://往上
            targetImgMainX=currentImgMainX;
            targetImgMainY=currentImgMainY-60;
            if(targetImgMainX<=540 && targetImgMainX>=0 && targetImgMainY<=540 && targetImgMainY>=0)
               {
                   targetLoc=targetImgMainX/60+targetImgMainY/60*10;
               }else{
                   targetLoc=-1;
               }
            cxt.clearRect(currentImgMainX,currentImgMainY,60,60);
            if(targetLoc==-1 || Map[targetLoc]==1 || Map[targetLoc]==3)
               {
                       
               }else{
                   currentImgMainX=targetImgMainX;
                   currentImgMainY=targetImgMainY;
                   
               }
               cxt.drawImage(ImgMain,32,96,32,32,currentImgMainX,currentImgMainY,60,60);
            
               break;
            
          case 68://往右
            targetImgMainX=currentImgMainX+60;
            targetImgMainY=currentImgMainY;
            if(targetImgMainX<=540 && targetImgMainX>=0 && targetImgMainY<=540 && targetImgMainY>=0)
               {
                   targetLoc=targetImgMainX/60+targetImgMainY/60*10;
               }else{
                   targetLoc=-1;
               }
            cxt.clearRect(currentImgMainX,currentImgMainY,60,60);
            if(targetLoc==-1 || Map[targetLoc]==1 || Map[targetLoc]==3)
               {
                       
               }else{
                   currentImgMainX=targetImgMainX;
                   currentImgMainY=targetImgMainY;
                  
               }
               cxt.drawImage(ImgMain,32,64,32,32,currentImgMainX,currentImgMainY,60,60);
            
               break;
            
          case 65://往左
            targetImgMainX=currentImgMainX-60;
            targetImgMainY=currentImgMainY;
            if(targetImgMainX<=540 && targetImgMainX>=0 && targetImgMainY<=540 && targetImgMainY>=0)
               {
                   targetLoc=targetImgMainX/60+targetImgMainY/60*10;
               }else{
                   targetLoc=-1;
               }
            cxt.clearRect(currentImgMainX,currentImgMainY,60,60);
            if(targetLoc==-1 || Map[targetLoc]==1 || Map[targetLoc]==3)
               {
                       
               }else{
                   currentImgMainX=targetImgMainX;
                   currentImgMainY=targetImgMainY;
                   
               }
               cxt.drawImage(ImgMain,32,32,32,32,currentImgMainX,currentImgMainY,60,60);
            
               break;    
            
            
    }
    
    switch(Map[targetLoc])
        {
            case undefined://牆壁
                document.getElementById("talkBox").innerHTML="";
                break;
            case 0://一般道路
                document.getElementById("talkBox").innerHTML="";
                break;
            case 1://障礙
                document.getElementById("talkBox").innerHTML="";
                break;
            case 2://終點
               
                if(count<6){
                    document.getElementById("talkBox").innerHTML="不要再偷懶了，還有"+(6-count)+"個銅鑼燒拉，快去幫我拿回來"
                }else{
                    document.getElementById("talkBox").innerHTML="大雄，謝謝你><";
                    alert("按開始進入下一關");
                    Map[targetLoc]=0;
                    isPlaying=false;
                    enemyIsPlaying=false;
                    enemy2IsPlaying=false;
                    gameTime++;
                    
                };
               
                break;
            case 3://KING
                if(count<6){
                   document.getElementById("talkBox").innerHTML="大雄，我快餓死了";
                }else{
                   document.getElementById("talkBox").innerHTML="ㄏㄏ，大雄我不小心都吃完了，忘記留你的份";    
                }
                
                break;
            case 4://西瓜
                document.getElementById("talkBox").innerHTML="哼整天命令我，趁現在趕快偷吃，不要給那死機器貓";
                break;    
            default:
                
                
        }
    
    if(Map[targetLoc]==4){
                       
        count++;
        Map[targetLoc]=0;
      };   
}







