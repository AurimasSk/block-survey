//client/components/Add.js
import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactRadioButtonGroup from 'react-radio-button-group';
import { Checkbox } from 'react-bootstrap';

var querystring = require('querystring');
class Add extends React.Component {
    constructor() {
        super();
        this.allTransportOptions = [
            "Atvyksiu nuosavu transportu",
            "Planuoju prisijungti prie kolegos, vyksiančio savo transportu",
            "Domiuosi viešojo transporto variantu"
        ];
        this.allSleepingOptions = [
            "Pasiliksiu renginyje iki kito ryto (su nuosava palapine)",
            "Vakare planuoju išvykti iš renginio"
        ];
        this.allFeedingOptions = [
            "Esu vegetaras",
            "Esu veganas",
            "Valgau viską, kas skaniai pagaminta",
            "Renginio metu planuoju nevartoti alkoholinių gėrimų"
        ];
        this.state = {
            inputData: {
                firstName: '',
                lastName: '',
                workplace: '',
                email: '',
                telephone: '',
                transport: '',
                sleeping: '',
                feeding: '',
                rulesAccepted: false
            }
        }
        this.onSave = this.onSave.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.insertNewExpense = this.insertNewExpense.bind(this);
    }
    componentDidMount() {
    }

    onSave(e) {
        this.insertNewExpense(this);
    }
    insertNewExpense(e) {
        console.log("Button clicked");
        console.log("Values: ", this.state);
        axios.post('/insert',
            querystring.stringify({
                firstName: e.state.inputData.firstName,
                lastName: e.state.inputData.lastName,
                workplace: e.state.inputData.workplace,
                email: e.state.inputData.email,
                telephone: e.state.inputData.telephone,
                transport: e.state.inputData.transport,
                sleeping: e.state.inputData.sleeping,
                feeding: e.state.inputData.feeding,
                rulesAccepted: e.state.inputData.rulesAccepted
            }), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(function (response) {
                // e.setState({
                //     messageFromServer: response.data
                // });
                console.log("Response: ", response);
            });
    }
    handleTextChange(event) {
        console.log("Event", event.target.name, event.target.value);
        const fieldName = event.target.name;
        let inputData = this.state.inputData;
        inputData[fieldName] = event.target.value;
        console.log("Changed value: ", inputData[fieldName]);
        return this.setState({ inputData: inputData });
    }

    handleCheckboxChange(event) {
        console.log("Event", event.target.name, event.target.checked);
        const fieldName = event.target.name;
        let inputData = this.state.inputData;
        inputData[fieldName] = event.target.checked;
        console.log("Changed value: ", inputData[fieldName]);
        return this.setState({ inputData: inputData });
    }

    handleRadioChange(value) {
        const fieldName = event.target.name;
        let inputData = this.state.inputData;
        inputData[fieldName] = value;
        console.log("Changed value: ", inputData[fieldName]);
        return this.setState({ inputData: inputData });
    }
    render() {

        return (
            <div>
                <section id="contact">
                    <div className="section-content">
                        <h1 className="section-header">Saint-Gobain</h1>
                    </div>
                    <div className="contact-section">
                        <form>
                            <div className="container">
                                <div className="col-lg-6 form-line">
                                    <div className="form-group">
                                        <label htmlFor="firstName">Vardas</label>
                                        <input type="text" className="form-control" id="firstName" name="firstName" value={this.state.firstName} onChange={this.handleTextChange} placeholder="Įveskite savo vardą" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastName">Pavardė</label>
                                        <input type="text" className="form-control" id="lastName" name="lastName" value={this.state.lastName} onChange={this.handleTextChange} placeholder="Įveskite savo pavardę" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="workplace">Įmonė</label>
                                        <input type="text" className="form-control" id="workplace" name="workplace" value={this.state.workplace} onChange={this.handleTextChange} placeholder="Įveskite savo įmonės pavadinimą" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">El. paštas</label>
                                        <input type="email" className="form-control" id="email" name="email" value={this.state.email} onChange={this.handleTextChange} placeholder="Įveskite savo el. paštą" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="telephone">Tel. Nr.</label>
                                        <input type="text" className="form-control" id="telephone" name="telephone" value={this.state.telephone} onChange={this.handleTextChange} placeholder="Įveskite savo telefono numerį" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label htmlFor="transport">Transportas</label>
                                        <ReactRadioButtonGroup
                                            options={this.allTransportOptions}
                                            name="transport"
                                            isStateful={true}
                                            onChange={checkedValue => this.handleRadioChange(checkedValue)}
                                            inputClassName="ledas"

                                        />
                                        <div className="form-group">
                                            <label htmlFor="sleeping">Nakvynė</label>
                                            <ReactRadioButtonGroup
                                                options={this.allSleepingOptions}
                                                name="sleeping"
                                                isStateful={true}
                                                onChange={checkedValue => this.handleRadioChange(checkedValue)}
                                                inputClassName="ledas"

                                            >
                                                {/* {this.allSleepingOptions.map(sleepingOption => 
                                                    <ReactRadioButton value={sleepingOption}>{sleepingOption}</ReactRadioButton>
                                                )

                                                } */}
                                            </ReactRadioButtonGroup>
                                            <div className="form-group">
                                                <label htmlFor="feeding">Maitinimas</label>
                                                <ReactRadioButtonGroup
                                                    options={this.allFeedingOptions}
                                                    name="feeding"
                                                    isStateful={true}
                                                    onChange={checkedValue => this.handleRadioChange(checkedValue)}
                                                    inputClassName="ledas"

                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                <div className="form-group col-lg-12 col-centered">
                                    {/* <input type="checkbox" className="form-control" id="rulesAccepted" name="rulesAccepted" value={this.state.rulesAccepted} value={this.state.rulesAccepted} /> Sutinku, kad su manimi būtų susisiekta Saint-Gobain vasaros renginio informacijos platinimo tikslais */}


                                    <label className="checkbox-inline" htmlFor="feeding">
                                        <input className="form-check-input" type="checkbox"
                                            name="rulesAccepted"    
                                            id="rulesAccepted"
                                            checked={this.state.rulesAccepted}
                                            onChange={this.handleCheckboxChange}
                                        /> Sutinku, kad su manimi būtų susisiekta Saint-Gobain vasaros renginio informacijos platinimo tikslais
                                    </label>
                                </div>
                                <br /><br /><br /><br />
                                <div>
                                    <input
                                        type="submit"
                                        className="btn btn-default submit"
                                        value="Išsiųsti"
                                        onClick={this.onSave} />
                                    {/* <button type="button" className="btn btn-default submit"><i className="fa fa-paper-plane" aria-hidden="true"></i>  Send Message</button> */}
                                </div>
                                <br /><br /><br /><br />
                            </div>
                        </form>
                    </div>
                </section>
            </div >
        )
    }
}
export default Add;