import React, { Component } from 'react';
import './App.css';
import { ScatterChart } from 'react-chartkick';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.onChange = {
            name1: this.handleChange.bind(this, 'num'),
            name2: this.handleChange.bind(this, 'maxRand'),
            array: this.handleChange.bind(this, 'arrayvar')
        };
        this.state = {
            num: '',
            maxRand: '',
            //
            enum: [],
            arrayvar: [],
            data: []

        };
        this.generate = this.generate.bind(this);
        this.onGenerate= this.onGenerate.bind(this);
        this.renderTable= this.renderTable.bind(this);
    }
    generate (){
        let array = [];
        let enumer = [];
        this.setState({data: []});
        for (let i=0; i<this.state.num; i++)
        {
            enumer[i] = i;
            let randnumb = Math.floor((Math.random() * (this.state.maxRand) + 1));
            this.setState(previousState => ({
                data: [...previousState.data, [i, randnumb]]
            }));
            array[i] = randnumb;
        }
        this.setState({arrayvar: []});
        this.setState({ arrayvar: array });
        this.setState({ enum: []});
        this.setState({ enum: enumer });
    }

    onGenerate(){
        this.generate();

    }

    handleChange(name, event) {
        this.setState({ [name]: event.target.value });
    };

    renderTable(){
        const tableInd = this.state.enum.map((number, index) =>
            <th key={index}>{ number }</th>);
        const tableNum = this.state.arrayvar.map((number, index) =>
            <th key={index}>{ number }</th>)

        return (
            <tbody>
            <tr>
                <th>Index</th>
                { tableInd }
            </tr>
            <tr>
                <th>Value</th>
                { tableNum }
            </tr>
            </tbody>
        );
    }

    render() {
        return (
            <div>
                <form className="App">
                    <label>Number: </label>
                    <input name="num" onChange={this.onChange.name1} />
                    {/* <button>Submit</button>*/}
                    <br />
                    <label>Max value: </label>
                    <input name="max" onChange={this.onChange.name2} />
                    {/*<button>Submit</button>*/}
                </form>
                {/*<h2>{ this.state.num }</h2>
                <br />
                <h2>{ this.state.maxRand }</h2>
                <br />*/}
                <button onClick={this.onGenerate}>Generate</button>
                <table className={'table'}>
                    { this.renderTable() }
                </table>
                <ScatterChart min={null} max={null} data={this.state.data} xtitle="Index" ytitle="Random Numbers" />

            </div>
        );
    }
}