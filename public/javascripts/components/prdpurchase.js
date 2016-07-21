var Prd = React.createClass({
    render:function(){
        return(
            <div>
                <SearchProduct></SearchProduct>
            </div>
        )
    }
});
var SearchProduct = React.createClass({
    searchProvider: function ( event ){
        var key= '';
        if(key = event.target.value.toLowerCase()) {
            $.ajax({
                url: 'http://127.0.0.1:3000/prd/' + key,
                dataType: 'json',
                crossDomain: true,
                data: {format: 'json'},
                success: function ( data ) {
                    this.setState({items: data.data});
                }.bind(this),
                error: function ( xhr, status, err ) {
                    alert(err)
                }.bind(this),
            })
        }


    },
    getInitialState: function () {
        return {
            items: [],
        }
    },
    render: function () {
        return (
            <div>
                <input type="text" onChange={this.searchProvider} className="form-control"/>

                <Product data={this.state.items}/>

            </div>
        )
    }
});
var Product = React.createClass({
    getInitialState:function(){
        return {
            selected: [],
            isSelected:false
        }
    },
    getProduct:function(data){
        this.state.isSelected = false
        this.setState({selected:[data]})
        console.log(this.state.isSelected)
    },
    render:function(){
            var ProductsNode = this.props.data.map(function(i){
                return(

                    <option value={i.name} onClick={this.getProduct.bind(this, i)} key={i._id}>
                        {i.name}
                    </option>

                )
            }.bind (this));
        return(
            <div>

                 <select className=" js-example-basic-single form-control" multiple="multiple">
                {ProductsNode}
                </select>



                  <ProductSelected data={this.state.selected}/>


            </div>
        )
    }
});
var ProductSelected = React.createClass({
    getInitialState:function(){
        return {
            items: [],
            tab: [],
            qte:null,
            prix:null,
            prixa:null,
            prixt:null,
            totalItems:[],
            totalht:[]
        };
    },
    getQte:function(e){
        this.setState({qte:e.target.value});
    },
    getPrix:function(e){
        this.setState({prix:e.target.value});
    },
    getPrixa:function(e){
        this.setState({prixa:e.target.value});
    },
    getPrd: function(data,qte,prix,prixa){
        this.state.prixt = Number(qte)*Number(prixa);
        this.state.tab.push({id:data._id,name:data.name,qte:qte,prix:prix,prixa:prixa,prixt:this.state.prixt})
        this.setState({items:this.state.tab});
        this.state.totalItems.push(this.state.prixt)
        console.log(this.state.total);
        this.state.totalht = this.state.totalItems.reduce( function (prev, cur) {
            return prev + cur;
        })
        //$.post('http://127.0.0.1:3000/qteplus',{id:data._id,qte:qte,prix:prix});
    },
    render:function(){
        var ProductNode = this.props.data.map(function(i){
            return(
                <div>
                    <div className="gq gg ala">
                        <input className="form-control" type="text" value={i.name}/>
                    </div>
                    <div className="gq gg ala">
                        <input className="form-control" type="number" onChange={this.getQte} value={this.state.qte} placeholder="Quentite" />
                    </div>
                    <div className="gq gg ala">
                        <input className="form-control" type="number" onChange={this.getPrixa} placeholder="Prix D'achat"/>
                    </div>
                    <div className="gq gg ala">
                        <input className="form-control" type="number" onChange={this.getPrix} placeholder="Prix De vente"/>
                    </div>
                        <a className="ce apo" onClick={this.getPrd.bind(this,i,this.state.qte,this.state.prix,this.state.prixa)}>Ajoute</a>
                </div>
            )
        }.bind (this));
        return(
            <div>
                {ProductNode}
                <ProductList data={this.state.items} />
                <div class="apu amg da">
                <h4 class="ani">Total: {this.state.totalht} DA</h4>
                </div>
            </div>
        )
    }
});


var ProductList = React.createClass({
    render:function(){
        var ProductListsNode = this.props.data.map(function(i){
            return(
                        <tr>
                            <td>{i.name}</td>
                            <td>{i.qte}</td>
                            <td>{i.prixa} DA</td>
                            <td>{i.prix} DA</td>
                            <td>{i.prixt} DA</td>
                        </tr>
            )
        }.bind (this));
        return(
            <div>
                <table className="cl" data-sort="table">
                    <thead className="thead-inverse">
                    <tr>
                        <th>Designation</th>
                        <th>Qte</th>
                        <th>Prix d'achat</th>
                        <th>Prix de vente</th>
                        <th>Total Prix d'achat</th>
                    </tr>
                    </thead>

                <tbody>
                    {ProductListsNode}
                </tbody>
                </table>
            </div>
        )
    }
});
ReactDOM.render(
    <Prd></Prd>,
    document.getElementById('product')
);