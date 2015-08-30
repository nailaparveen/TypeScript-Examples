/**
 * Created by a on 8/27/15.
 */
//Calculator to solve expressions
document.write("<h2> Basic Calculator to Evaluate Expressions like (2+2)*(6/2) using Algorithms</h2>")
document.write('<input type="text"  id="screen" size="100" readonly="readonly">');
var t:any= document.getElementById("screen");
t.value="";


document.write('<input type="text"  id="screen2" size="80">');
var t2:any= document.getElementById("screen2");
t2.value="";
t2.style.display="none";


var infix:any[]=[];
var iterator:number =-1;
var nextExp=true;
var newnum=true;

function makeNo(e){
    if (newnum) {
        if(nextExp){
            t.value="";
            nextExp=false;
        }
        iterator++;
        t2.value = e;
    }
    else {
        t2.value = t2.value + e;
    }
    t.value = t.value + e;
    infix[iterator]=Number(t2.value);
    newnum = false;
}

function clearOne(e){
    var l=(t2.value).length;
    var sub:string = t2.value; //current
    var sub2:string = t.value; //all
    var ch=sub.substr(l-1,1);

    t2.value = sub.substr(0,l-1);
    t.value = sub2.substr(0,(t.value).length-1);
    if(ch=="+" || ch=="-" || ch=="*" || ch=="/" || ch==")" || ch=="("){
        newnum = false;
        iterator--;
        t2.value=infix[iterator];

        copyArray();

    }
    else{

        infix[iterator]=Number(t2.value);

        if (infix[iterator]==0) {
            iterator--;
            copyArray();

        }

    }
}
function copyArray()
{
    var t:any[]=[];
    for (var i=0;i<infix.length-1;i++)
    {
        t[i]= infix[i];
    }
    infix=t;
    //alert(infix);
    newnum=true;
t2.value = infix[iterator];
}
function  makeFn(e){
    //alert(infix[iterator]);

    if((infix[iterator]!="+" && infix[iterator]!="-" && infix[iterator]!="*" && infix[iterator]!="/" )||(e==")"||e=="(")){
        //alert("in");
        iterator++;
        infix[iterator]=e;

        if (nextExp){
            nextExp = false;
            t.value=e;
        }
        else{
            t.value+=e;
        }
        t2.value=e;
        newnum = true;
    }
}
function makeAns(e){
    //alert(infix);
    if(e=='='){
        convert();

        var result=Evaluate();
        if(flag==1)
            t.value=result;
        else
            t.value="Invalid Expression"

        newnum=true;
        stack=[];
        postfix=[];
        tops=-1;
        infix=[];
        flag=1;
        iterator=-1;
        nextExp=true;
    }
}
var stack : any[]=[];
var postfix : any[] = [];
var tops: number=-1;
function convert(){
    var i:number = 0;
    var j : number =0;
    while(i<infix.length){
        var ch = infix[i++];
        if (typeof ch == "number")
            postfix[j++]=ch;
        else
        {
            while(tops!=-1 && precedence(stack[tops],ch))
                postfix[j++]=stack[tops--];
            if (tops == -1 || ch!=')')
                stack[++tops]=ch;
        }
    }
    while(tops != -1){
        var ch = stack[tops--];
        if (ch != "(")
            postfix[j++]=ch;
    }

}
function  precedence(str: string, current:string){
    if(str!="(" && current==")")
        return 1;
    else if((str=="*" || str=="/")&&(current=="*"||current=="/" ||current=="+" || current=="-"))
        return 1;
    else if((str=="+"|| str=="-")&&(current=="+"||current=="-"))
        return 1;
    else
        return 0;
}

////////////////////////////////
var flag=1;
function Evaluate()
{
    stack=[];
    tops=-1;
    var i:number =0;
    while(i<postfix.length)
    {
        var ch=postfix[i++];
        if(typeof ch== "number")
        {

            stack[++tops]=ch;
        }
        else
        {
            if(tops<1) flag=0;
            else
            {
                var op1:number,op2:number;
                op2=stack[tops--];

                op1=stack[tops--];

                switch(ch)
                {
                    case '+': stack[++tops]=op1+op2; break;
                    case '-': stack[++tops]=op1-op2; break;
                    case '*': stack[++tops]=op1*op2; break;
                    case '/': stack[++tops]=op1/op2; break;
                    default: alert("Invalid Character" + ch);
                        flag=0;

                }
            }

        }
    }
    if(tops!=0) flag=0;
    return stack[tops--];
}