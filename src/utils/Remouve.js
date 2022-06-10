export default function Remouve(Widths,Centers,L){
    this.surface=Widths;
    this.position=Centers;
    this.leng=L;
    this.newPosition=[];
    
    this.Getconstraint=function() {
        var s=0;
       for (var index = 0; index <  this.surface.length; index++) {
           var element =  this.surface[index]*2;
           s=s+ element;        
       } 
       
     //console.log(this.leng);
      //console.log("this.leng-s"+(this.leng-s));
      if(( this.leng-s)<0){
          console.error("the proof is not valide because sum of surface biger of the length of axe");
      return null;
    
    }else   
     return  this.leng-s; 
     
    };
     this.constOne=function(f1,f2,s1,s2){
         return (f1+f2) >= (s1+s2)    
     };
     this.constTwo=function(f1,f2,o1,o2){
           return ((o1 <o2)&&(f1 <f2))     
     };
    this.constThree=function(pos,order,length,size){
        var posNew=pos;
        if (order==0) {
           posNew= size;
        } else {
            if (order==length) {
                posNew=this.leng-size;
            }
        }
       return posNew; 
    };   
     this.constFour=function(f1,f2,o1,o2){
           return ((o1 <o2)&&(f1 <f2))     
     }; 
    this.claculatenewP=function(p,cnst,pmin,pmax) {
            var res= (p-pmin)*cnst;
            res= res/(pmax-pmin);
         // //console.log("res : "+res+"   "+pmin+"   "+pmax);
            if(( res)> cnst){
                this.leng=this.leng+10;
                this.calculateF();
                console.error("the proof is not valide position biger of the length of axe");
                }else{
                    console.error("the proof is valided");
                    return res;    
                }   
                
    };
   this.calculateF=function() {
     var listf=[];  
     //console.log("this.position ++++++++++++++");
     //console.log(this.position);
      //console.log("++++++++++++++");
       var cnst = this.Getconstraint();
        var listsorted=this.position;//.sort(function(a, b){return a-b});
         
         Array.prototype.max = function() {
            return Math.max.apply(null, this);
            };

            Array.prototype.min = function() {
            return Math.min.apply(null, this);
            };
      
        var pmin= listsorted.min();
        var pmax= listsorted.max();
       for (var index = 0; index < this.position.length ; index++) {//this.position.length
            var p = this.position[index];
            var fun=null;
            var  newp=null;
            if ((index==0)||(index==(this.position.length-1))){
            fun= this.constThree(p,index,(this.position.length-1),this.surface[index]);
           //console.log("fn : "+fun);  
            }
             else{
               
             // //console.log("  p : "+p);
             newp= this.claculatenewP(p,cnst,pmin,pmax);
           //   //console.log("  newp : "+newp); 
                this.newPosition.push(newp);
                var surfacebefor=0;
                for (var ind = 0; ind <= index; ind++) {
                    surfacebefor= surfacebefor+(this.surface[ind]*2);           
                }
                fun= newp - this.surface[index]+surfacebefor;
                //   //console.log("  fun : "+fun);
                
            }
            listf.push(fun);
       }
      
   return listf;  
   }
 
}

