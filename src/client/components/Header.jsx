import React, { Component, PropTypes } from 'react';
import AddEndpoint from './AddEndpoint';
import FileSaver from 'file-saver';

class Header extends Component {
  onDownload = () => {
    this.refs.export.href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.props.state.getPayload()));
  }

  componentDidMount() {
    this.refs.importInput.addEventListener('change', (event) => {
      var input = event.target;

      var reader = new FileReader();
      reader.onload = () => {
        var dataString = reader.result;
        var spec = JSON.parse(dataString);
        this.props.state.loadSpec(spec);
        this.refs.importInput.value = null;
      };
      reader.readAsText(input.files[0]);
    }, false);
  }

  render() {
    return (
      <div className="ui fluid small menu hermesHeader">
        <div className="ui container"  style={{width: '90% !important'}}>
        {<div className="item">
          <img src={require("../asset/Logo.png")} style={{width: '135px', height: '45px'}}/> 
        </div>}        
          <div className="item">
            <AddEndpoint onClick={this.props.createEndPoint} onCreateSocketEndpoint={this.props.createSocketEndpoint} createGraphqlEndpoint={this.props.createGraphqlEndpoint}/>
          </div>
           <div className="item">
            <div className="ui small icon" >
              <a className="ui upload blue inverted icon button" onClick={this.props.save}>
                <i className="icon save"></i> Save
              </a>
            </div>
          </div>
          <div className="item">
            <div className="ui small icon" >
              <a className="ui upload blue inverted icon button" onClick={this.props.initialize}>
                <i className="icon erase"></i> Reset
              </a>
            </div>
          </div>
          <div className="item">
            <div>
              <label htmlFor="file" className="ui icon blue inverted button"  >
                <i className="file icon"></i> Import
               </label>
              <input ref="importInput" id="file" type='file' accept='json/*' style={{ display: 'none' }}/>
            </div>
          </div>
          <div className="item">
            <div className="ui small icon" >
              <a className="ui upload blue inverted icon button" ref="export" href="" onClick={this.onDownload} download="spec.json">
                <i className="icon upload"></i> Export
              </a>
            </div>
          </div>         
          <a href="#" className="right item deployButton" onClick={this.props.onDeploy} >
              <i className="icon send outline"></i>
              Deploy
          </a>
          <div className="item">
            <div className="ui inverted transparent left icon input">
              <input type="text" value={`http://localhost:${this.props.port}`} readonly/>
              <i className="lightning icon"></i>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  spec: PropTypes.obj
}

export default Header;
