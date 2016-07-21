var Purchase = React.createClass({
    render: function () {
        return (
            <div>
                <SearchPurchase></SearchPurchase>
            </div>
        )
    }
});
var SearchPurchase = React.createClass({
    getInitialState: function () {
        return {
            items: [],
            isSelected: false
        }
    },
    searchProvider: function ( event ){
        var key= '';
        if(key = event.target.value.toLowerCase()) {
            $.ajax({
                url: 'http://127.0.0.1:3000/listprovider/' + key,
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
        this.state.isSelected = true
    },
    render: function () {
        return (
            <div>
                <input type="text" placeholder="Fournisseur" onChange={this.searchProvider} aria-autocomplete="list" autoFocus="On" role="textbox" spellcheck="false" autocapitalize="off" autocorrect="off" autocomplete="off" className="form-control select2-search__field"/>
                {
                    this.state.isSelected
                        ?
                    <Provider data={this.state.items}/>
                        :null
                }
            </div>
        )
    }
});
var Provider = React.createClass({
    getInitialState:function(){
        return {
            selected: [],
            isSelected:true
        }
    },
    getProvider:function(data){
        this.setState({selected:[data]})
        this.state.isSelected = false
    },
    render:function(){
        var ProvidersNode = this.props.data.map(function(i){
            return(

                    <option value={i.name} onClick={this.getProvider.bind(this,i)} key={i._id}>
                        {i.name}
                    </option>


            )
        }.bind (this));
        return(
            <div>
                {
                    this.state.isSelected
                        ?
                <select className=" js-example-basic-single form-control" multiple="multiple">
                     {ProvidersNode}
                </select>
                        :null
                }
                <br/>
                <ProviderSelected data={this.state.selected}/>
            </div>
        )
    }
});

var ProviderSelected = React.createClass({
    render:function(){
        var ProviderNode = this.props.data.map(function(i){
            return(
                <div >
                    <div className="gq gg ala">
                         <input className="form-control" type="text" value={i.name}/>
                    </div>

                    <div className="gq gg ala">
                         <input className="form-control" type="text" value={i.address}/>
                    </div>

                    <div className="gq gg ala">
                    <input className="form-control" type="text" value={i.tel}/>
                    </div>

                    <div className="gq gg ala">
                        <input className="form-control" type="text" value={i.email}/>
                    </div>
                </div>
            )
        }.bind (this));
        return(
            <div>
            {ProviderNode}
            </div>
        )
    }
});
ReactDOM.render(
    <Purchase></Purchase>,
    document.getElementById('purchase')
);