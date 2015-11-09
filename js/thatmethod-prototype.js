/**
 * Created by Vurt on 03.11.2015.
 */
var ThatMethod = {
    constructor: function(category_id,userid){
        this.cid = category_id;
        this.curr_index=this.startpos = 2;
        this.pg = [[],[],[],[],[],[]];
        this.uid = [];
        this.shifted='';
        this.debug=[];
        this.page='';
        this.lastword=[];
        this.prevword=[];
        for(i=0;i<userid.length; i++){
            var temp=userid[i].split('_');
            this.uid[temp[0]]=temp[1];
        }
        for(i=0; i<this.cid.length;i++){
            this.pg[this.uid[this.cid[i]]].push(this.cid[i]);
        }
        return this;
    },
    print_r: function(){
        console.log(this.pg);
    },
    idindex: function(){
        return this.cid.indexOf(this.prevword[0])+1;
    },
    nottwise: function(path){
        if(this.page==path){
            return false;
        } else {
            this.page=path;
            return true;
        }
    },
    toprev: function(curr_ind){
        if(!curr_ind)curr_ind=this.prevword;
        if(curr_ind[1]>1) {
            curr_ind[1]--;
        }
        this.pg[curr_ind[1]].push(curr_ind[0]);
    },
    tonext: function(curr_ind){
        if(!curr_ind)curr_ind=this.prevword;
        if(curr_ind[1]<5) {
            curr_ind[1]++;
        }
        this.pg[curr_ind[1]].push(curr_ind[0]);
    },
    learn: function(){
        this.prevword=this.lastword;
        if(this.shifted = this.pg[0].shift()){
            this.curr_index=this.startpos;
            this.lastword=[this.shifted,this.curr_index];
            this.debug.push(this.lastword);
            return this.lastword;
        } else {
            var el_number=this.rand_el();
            this.curr_index=el_number;
            if(this.shifted=this.pg[el_number].shift()){
                this.lastword=[this.shifted,el_number];
                this.debug.push(this.lastword);

            }
            return this.lastword;
        }
    },
    rand_el: function(){
        var sum=0;
        for(i=1;i<=5;i++){
            if(this.pg[i].length) sum+=6-i;
        }
        if(sum==1){
            return 5;
        }
        var x = Math.floor(Math.random() * (sum-1)) + 1;
        var res=0;
        for(i=1;i<5;i++){
            if(this.pg[i].length&&(x<=6-i)){
                res=i;
                break;
            } else {
                x-=6-i;
            }
        }
        return res;
    },
    finish: function(JSONbool){
        var final=[];
        for(i=0;i<=5;i++){
            if(this.pg[i].length)
            for(j=0;j<this.pg[i].length;j++){
                final.push([this.pg[i][j],i]);
            }
        }
        if(JSONbool){
            return JSON.stringify(final);
        } else {
            return final;
        }
    }
};