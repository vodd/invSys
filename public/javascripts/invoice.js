new Vue({
  el:'#app',
  data:{
    clients:[],
    cli:[],
    items:[],
    item:[],
    seethem:false,
    seet:false,
    seet2:false,
    qte:[],
    total:[],
    toto:0,
    tata:0,
    numI:1,
    final:[]
  },
  methods:{
    loadClients:function(){
      this.$http.get('http://127.0.0.1:3000/invoice/client/'+this.sea,function(data,status,request){
        if(status == 200){
          this.clients = data,
          this.seethem = true
        }
      });
    },
    findItem:function(){
      this.$http.get('http://127.0.0.1:3000/prd/'+this.sea1,function(data,status,request){
        if(status == 200){
          this.items = data,
          this.seet =true
          this.seet2 =true
        }
      });
    },
    addItem:function(data){
      this.item.push(data);
      this.seet =true;
      this.seet2 =false;
    },
    getClient:function(index){
      this.cli = index,
      this.sea = index.name,
      this.seethem = false,
          console.log('test')
    },
    addItems:function(i,qte,prix){
      this.toto = prix * qte;
      this.total.push(this.toto);
      this.seet = false,
      this.final.push({name:i.name,prix:prix,qte:qte,total:this.toto}),
      this.tata = this.total.reduce( function (prev, cur) {
          return prev + cur;
      });
      this.item = []
     },
     updateItems:function(it,prix,qte,index){
       this.toto = prix * qte;
       this.final[index] = {name:it.name,prix:prix,qte:qte,total:this.toto};
       this.total[index] = this.toto;
       this.tata = this.total.reduce( function (prev, cur) {
           return prev + cur;
       });
     },
     removeItem:function(index){
       this.total.splice(index,1);
       this.final.splice(index,1);
       if(this.total.length === 0) {
         this.tata = 0;
       }else{
         this.tata = this.total.reduce( function (prev, cur) {
             return prev + cur;
         });
      }

     }

  }
});
