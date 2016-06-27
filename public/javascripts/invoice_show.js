new Vue({
  el:'#app',
  data:{
    item:[],
    prd:[],
    items:[],
    seet:false,
    seet2:true,
    update:false,
    total:[],
    toto:0,
    tata:0,
    final:[]
  },
  // created: function () {
  //  this.loadInvoice();
  //  },
  //  watch: {
  //   currentBranch: 'loadInvoice'
  // },
  methods:{
    //loading product on json
    loadInvoice:function(id){
      this.$http.get('http://127.0.0.1:3000/inv/'+this.sea,function(data,status,request){
        console.log(id)
        if(status == 200){
          this.item = data;
          this.seet =true;
          this.seet2 =false;
          var op = this.item.data.product;
          for(var i = 0;i < op.length;i++){
            this.final.push({name:op[i].name,prix:op[i].prix,qte:op[i].qte,total:op.prix*op.qte});
            this.total.push(op[i].prix*op[i].qte);
            this.tata = this.total.reduce( function (prev, cur) {
                return prev + cur;
            });
          }
          console.log(this.final);
        }
      });
      
    },
    loadquto:function(){
      this.$http.get('http://127.0.0.1:3000/quto/'+this.sea,function(data,status,request){
        console.log(this.sea)
        if(status == 200){
          this.item = data;
          this.seet =true;
          this.seet2 =false;
          var op = this.item.data.product;
          for(var i = 0;i < op.length;i++){
            this.final.push({name:op[i].name,prix:op[i].prix,qte:op[i].qte,total:op.prix*op.qte});
            this.total.push(op[i].prix*op[i].qte);
            this.tata = this.total.reduce( function (prev, cur) {
                return prev + cur;
            });
          }
          console.log(this.final);
        }
      });
      },
    //find item
    findItem:function(){
      this.$http.get('http://127.0.0.1:3000/prd/'+this.sea1,function(data,status,request){
        if(status == 200){
          this.items = data,
          this.seet =true
        }
      });
    },
    //add item to input add
    addItem:function(data){
      this.prd.push(data);
      this.seet =true;
    },
    //add item to the list
    addItems:function(i,qte,prix){
      this.toto = prix * qte;
      this.total.push(this.toto);
      console.log(this.total);
      this.seet = true,
      this.final.push({name:i.name,prix:prix,qte:qte,total:this.toto}),
      this.tata = this.total.reduce( function (prev, cur) {
          return prev + cur;
      })
     },
    //edit product list
    updateItems:function(it,prix,qte,index){
      this.toto = prix * qte;
      this.final[index] = {name:it.name,prix:prix,qte:qte,total:this.toto};
      this.total[index] = this.toto;
      this.tata = this.total.reduce( function (prev, cur) {
          return prev + cur;
      });
      console.log(this.tata);
    },
    //show edit button
    mod:function(){
     this.update = true;
   },
   //remove item from list
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
