var Purchase = React.createClass({
    render: function () {
        return (
                <SearchPurchase></SearchPurchase>
        )
    }
});
var SearchPurchase = React.createClass({
    getInitialState: function () {
        return {
            items: [],
            selected: [],
            isSelected: false,
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
    getProvider: function ( data ) {
        this.setState({selected: [data]})
        this.state.isSelected = false
        console.log(this.state.selected)
    },
    render: function () {
        return (
                    <div className="dropdown">
                    <input className="dropdown-toggle form-control" data-toggle="dropdown" onChange={this.searchProvider} />
                            <ul className="dropdown-menu" >
                                {this.state.items.map(record => ( // implicit return
                                <li onClick={this.getProvider.bind(this, record)} className="dropdown-item" key={record._id}>{record.name}</li>
                                ))}
                            </ul>
                        <ProviderSelected data={this.state.selected} />
                    </div>
        )
    }
});

var ProviderSelected = React.createClass({
    render:function(){
        var ProviderNode = this.props.data.map(function(i){
            return(
                <div >
                    <br/>
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