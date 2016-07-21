var Engins;
Engins = React.createClass ({
    getInitialState: function () {
        return {
            data: [],
        }
    },
    render: function () {
        return (
            <div>
                <SearchList></SearchList>
            </div>
        )
    }
});

var SearchList = React.createClass ({
    searchList: function ( event ) {
        var key = event.target.value.toLowerCase ();
        $.ajax ({
            url: 'http://127.0.0.1:3000/ordeng/' + key,
            dataType: 'json',
            crossDomain: true,
            data: {format: 'json'},
            success: function ( data ) {
                this.setState ({items: data.data});
            }.bind (this),
            error: function ( xhr, status, err ) {
                alert (err)
            }.bind (this),
        });
    },
    getInitialState: function () {
        return {
            items: [],
        }
    },

    render: function () {
        return (
            <div>
                <input type="text" onChange={this.searchList} placeholder="Numero d'engin" autoComplete="off"/>
                <Engin data={this.state.items}></Engin>
            </div>
        )
    }
});

var Engin = React.createClass ({
    getInitialState: function () {
        return {
            enginSelect: [],
            isSelected: true
        }
    },
    getEngin: function ( data ) {
        this.setState ({enginSelect: [data]});
        this.state.isSelected = false
    },
    render: function () {
        var enginNode = this.props.data.map (function ( i ) {
            return (
                <ul>
                    {
                        this.state.isSelected
                            ?
                            <li onClick={this.getEngin.bind (this, i)} key={i._id}>
                                {i.enginNum} {i.marque}
                            </li>
                            : null
                    }
                </ul>
            )
        }.bind (this));
        return (
            <div>
                {enginNode}
                <EnginSelect data={this.state.enginSelect}/>
            </div>
        )
    }
});

var EnginSelect = React.createClass ({

    render: function () {
        var engNode = this.props.data.map (function ( i ) {
            return (
                <div key={i._id}>
                    <h5>Numero d'engin : {i.enginNum}</h5>
                    <h5>Type : {i.type}</h5>
                    <h5>Marque : {i.marque}</h5>
                    <input type="hidden" name="enginNum" value={i.enginNum}/>
                    <input type="hidden" name="type" value={i.type}/>
                    <input type="hidden" name="marque" value={i.marque}/>

                </div>
            )
        }.bind (this));
        return (
            <div>
                {engNode}
            </div>
        )
    }
})


ReactDOM.render (
    <Engins></Engins>,
    document.getElementById ('engin')
)