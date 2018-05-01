import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactRadioButtonGroup from 'react-radio-button-group';
import TimePicker from 'react-bootstrap-time-picker';
import { Checkbox, CheckboxGroup } from 'react-checkbox-group';
import classNames from 'classnames';
import validator from 'validator';

var querystring = require('querystring');
class Add extends React.Component {
    constructor() {
        super();
        this.allTransportOptions = [
            "Atvyksiu nuosavu transportu",
            "Domiuosi viešojo transporto variantu",
            "Planuoju prisijungti prie kolegos, vyksiančio savo transportu",
        ];
        this.allSleepingOptions = [
            "Pasiliksiu renginyje iki kito ryto (su nuosava palapine)",
            "Vakare planuoju išvykti iš renginio"
        ];
        this.arriveOptions = [
            "09:30 – 10:30 val.",
            "10:30 – 11:30 val.",
            "Pasibaigus oficialios registracijos laikui"
        ];
        this.state = {
            inputData: {
                firstName: { value: '', isValid: true, message: '' },
                lastName: { value: '', isValid: true, message: '' },
                workplace: { value: '', isValid: true, message: '' },
                email: { value: '', isValid: true, message: '' },
                telephone: { value: '', isValid: true, message: '' },
                transport: { value: '', isValid: true, message: '' },
                colleagueName: { value: '', isValid: true, message: '' },
                sleeping: { value: '', isValid: true, message: '' },
                arriveTime: { value: '', isValid: true, message: '' },
                customArriveTime: { value: '', isValid: true, message: '' },
                feeding: {
                    value:
                        [
                            { title: "Esu vegetaras", index: "1", checked: false },
                            { title: "Esu veganas", index: "2", checked: false },
                            { title: "Valgau viską, kas skaniai pagaminta", index: "3", checked: false },
                            { title: "Renginio metu planuoju nevartoti alkoholinių gėrimų", index: "4", checked: false }
                        ],
                    isValid: true, message: ''
                },
                rulesAccepted: { value: false, isValid: true, message: '' },
                safetyAccepted: { value: false, isValid: true, message: '' },
            }
        }
        this.onSave = this.onSave.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.insertNewExpense = this.insertNewExpense.bind(this);
        this.validateInputs = this.validateInputs.bind(this);
        this.resetValidationStates = this.resetValidationStates.bind(this);
        this.handleCheckboxGroupChanged = this.handleCheckboxGroupChanged.bind(this);
    }
    componentDidMount() {
    }

    onSave(e) {
        // this.insertNewExpense(this);
        e.preventDefault();
        this.resetValidationStates();
        this.validateInputs();
    }

    validateInputs() {
        var state = this.state;

        var inputValid = true;
        if (state.inputData.firstName.value.length == 0) {
            state.inputData.firstName.isValid = false;
            state.inputData.firstName.message = 'Prašome įvesti savo vardą';
            this.setState(state);
            inputValid = false;
        }
        if (state.inputData.lastName.value.length == 0) {
            state.inputData.lastName.isValid = false;
            state.inputData.lastName.message = 'Prašome įvesti savo pavardę';
            this.setState(state);
            inputValid = false;
        }
        if (state.inputData.workplace.value.length == 0) {
            state.inputData.workplace.isValid = false;
            state.inputData.workplace.message = 'Prašome įvesti savo įmonės pavadinimą';
            this.setState(state);
            inputValid = false;
        }
        if (!validator.isEmail(state.inputData.email.value)) {
            state.inputData.email.isValid = false;
            state.inputData.email.message = 'Prašome įvesti teisingą el. pašto adresą';
            this.setState(state);
            inputValid = false;
        }
        if (state.inputData.telephone.value.length == 0) {
            state.inputData.telephone.isValid = false;
            state.inputData.telephone.message = 'Prašome įvesti savo savo tel. nr.';
            this.setState(state);
            inputValid = false;
        }
        if (state.inputData.transport.value.length == 0) {
            state.inputData.transport.isValid = false;
            state.inputData.transport.message = 'Prašome pasirinkti transporto variantą';
            this.setState(state);
            inputValid = false;
        }
        if (state.inputData.transport.value == this.allTransportOptions[2] &&
            state.inputData.colleagueName.value.length == 0) {
            state.inputData.colleagueName.isValid = false;
            state.inputData.colleagueName.message = 'Prašome įvesti kolegos vardą';
            this.setState(state);
            inputValid = false;
        }
        if (state.inputData.arriveTime.value.length == 0) {
            state.inputData.arriveTime.isValid = false;
            state.inputData.arriveTime.message = 'Prašome pasirinkti atvykimo laiką';
            this.setState(state);
            inputValid = false;
        }
        if (state.inputData.arriveTime.value == this.arriveOptions[2] &&
            state.inputData.customArriveTime.value.length == 0) {
            state.inputData.customArriveTime.isValid = false;
            state.inputData.customArriveTime.message = 'Prašome įvesti apytikrį atvykimo laiką';
            this.setState(state);
            inputValid = false;
        }
        if (state.inputData.sleeping.value.length == 0) {
            state.inputData.sleeping.isValid = false;
            state.inputData.sleeping.message = 'Prašome pasirinkti nakvynės variantą';
            this.setState(state);
            inputValid = false;
        }
        var feedingOptionSelected = false;
        state.inputData.feeding.value.map(feedingChoice => {
            if (feedingChoice.checked)
                feedingOptionSelected = true;
        });
        if (!feedingOptionSelected) {
            state.inputData.feeding.isValid = false;
            state.inputData.feeding.message = 'Prašome pasirinkti maitinimo poreikius';
            this.setState(state);
            inputValid = false;
        }
        if (!state.inputData.rulesAccepted.value) {
            state.inputData.rulesAccepted.isValid = false;
            state.inputData.rulesAccepted.message = 'Prašome pažymėti';
            this.setState(state);
            inputValid = false;
        }
        if (!state.inputData.safetyAccepted.value) {
            state.inputData.safetyAccepted.isValid = false;
            state.inputData.safetyAccepted.message = 'Prašome sutikti su saugumo reikalavimais';
            this.setState(state);
            inputValid = false;
        }

        return inputValid;
    }

    resetValidationStates() {
        var state = this.state;

        Object.keys(state.inputData).map(key => {
            if (state.inputData[key].hasOwnProperty('isValid')) {
                state.inputData[key].isValid = true;
                state.inputData[key].message = '';
            }
        });
        this.setState(state);
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
        inputData[fieldName].value = event.target.value;
        console.log("Changed value: ", inputData[fieldName]);
        return this.setState({ inputData: inputData });
    }

    handleCheckboxChange(event) {
        console.log("Event", event.target.name, event.target.checked);
        const fieldName = event.target.name;
        let inputData = this.state.inputData;
        inputData[fieldName].value = event.target.checked;
        console.log("Changed value: ", inputData[fieldName]);
        return this.setState({ inputData: inputData });
    }

    handleTimeChange(time) {
        console.log("Time", time);
        const fieldName = event.target.name;
        let inputData = this.state.inputData;
        inputData[fieldName].value = time;
        console.log("Changed value: ", inputData[fieldName]);
        return this.setState({ inputData: inputData });
    }

    handleRadioChange(value) {
        console.log("Event", event.target.name, event.target.checked);
        const fieldName = event.target.name;
        let inputData = this.state.inputData;
        inputData[fieldName].value = value;
        console.log("Changed value: ", inputData[fieldName]);
        return this.setState({ inputData: inputData });
    }

    handleCheckboxGroupChanged(event) {
        console.log("Event", event.target.name, event.target.checked);
        const index = event.target.name;
        let inputData = this.state.inputData;
        inputData.feeding.value.map(feedingOption => {
            if (feedingOption.index == index)
                feedingOption.checked = event.target.checked;
        })
        console.log("Changed value: ", inputData.feeding);
        return this.setState({ inputData: inputData });
    }

    render() {

        /*
      Each of the group classes below will include the 'form-group' class, and will only
      include the 'has-error' class if the isValid value is false.
      */
        var firstNameGroupClass = classNames('form-group', { 'has-error': !this.state.inputData.firstName.isValid });
        var lastNameGroupClass = classNames('form-group', { 'has-error': !this.state.inputData.lastName.isValid });
        var workplaceGroupClass = classNames('form-group', { 'has-error': !this.state.inputData.workplace.isValid });
        var emailGroupClass = classNames('form-group', { 'has-error': !this.state.inputData.email.isValid });
        var telephoneGroupClass = classNames('form-group', { 'has-error': !this.state.inputData.telephone.isValid });
        var transportGroupClass = classNames('form-group', { 'has-error': !this.state.inputData.transport.isValid });
        var colleagueNameGroupClass = classNames('form-group', { 'has-error': !this.state.inputData.colleagueName.isValid });
        var arriveTimeGroupClass = classNames('form-group', { 'has-error': !this.state.inputData.arriveTime.isValid });
        var customArriveTimeGroupClass = classNames('form-group', { 'has-error': !this.state.inputData.customArriveTime.isValid });
        var sleepingGroupClass = classNames('form-group', { 'has-error': !this.state.inputData.sleeping.isValid });
        var feedingGroupClass = classNames('form-group', { 'has-error': !this.state.inputData.feeding.isValid });
        var rulesAcceptedGroupClass = classNames('form-group', { 'has-error': !this.state.inputData.rulesAccepted.isValid });
        var safetyAcceptedGroupClass = classNames('form-group', { 'has-error': !this.state.inputData.safetyAccepted.isValid });

        return (
            <div>
                <section id="contact">
                    <div className="container">
                        <div className="col-lg-1"/>    
                        <div className="col-lg-10">
                            <h4 className="section-header">Saint-Gobain džiaugiasi statydami ne tik namus, bet ir kasdien tvirtėjantį ryšį su savo klientais bei partneriais. Į šią kasdien tobulinamą konstrukciją sudėję geriausius save, kviečiame jus – mūsų rimtus, pašėlusius, kūrybingus ar svajojančius draugus – užpildyti Saint-Gobain MORE Joninių festivalio dalyvio anketą.</h4>
                        </div>
                        <div className="col-lg-1"/>
                    </div>
                    <div className="contact-section">
                        <form onSubmit={this.onSave}>
                            <div className="container">
                                <div className="col-lg-6 form-line">
                                    <div className={firstNameGroupClass}>
                                        <label htmlFor="firstName">Vardas</label>
                                        <input type="text" className="form-control" id="firstName" name="firstName" value={this.state.firstName} onChange={this.handleTextChange} placeholder="Įveskite savo vardą" />
                                        <span className="help-block">{this.state.inputData.firstName.message}</span>
                                    </div>
                                    <div className={lastNameGroupClass}>
                                        <label htmlFor="lastName">Pavardė</label>
                                        <input type="text" className="form-control" id="lastName" name="lastName" value={this.state.lastName} onChange={this.handleTextChange} placeholder="Įveskite savo pavardę" />
                                        <span className="help-block">{this.state.inputData.lastName.message}</span>
                                    </div>
                                    <div className={workplaceGroupClass}>
                                        <label htmlFor="workplace">Įmonė</label>
                                        <input type="text" className="form-control" id="workplace" name="workplace" value={this.state.workplace} onChange={this.handleTextChange} placeholder="Įveskite savo įmonės pavadinimą" />
                                        <span className="help-block">{this.state.inputData.workplace.message}</span>
                                    </div>
                                    <div className={emailGroupClass}>
                                        <label htmlFor="email">El. paštas</label>
                                        <input type="text" className="form-control" id="email" name="email" value={this.state.email} onChange={this.handleTextChange} placeholder="Įveskite savo el. paštą" />
                                        <span className="help-block">{this.state.inputData.email.message}</span>
                                    </div>
                                    <div className={telephoneGroupClass}>
                                        <label htmlFor="telephone">Tel. Nr.</label>
                                        <input type="text" className="form-control" id="telephone" name="telephone" value={this.state.telephone} onChange={this.handleTextChange} placeholder="Įveskite savo telefono numerį" />
                                        <span className="help-block">{this.state.inputData.telephone.message}</span>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className={transportGroupClass}>
                                        <label htmlFor="transport">Transportas</label>
                                        <ReactRadioButtonGroup
                                            options={this.allTransportOptions}
                                            name="transport"
                                            isStateful={true}
                                            onChange={checkedValue => this.handleRadioChange(checkedValue)}
                                            inputClassName="ledas"
                                        />
                                        {this.state.inputData.transport.value == 'Planuoju prisijungti prie kolegos, vyksiančio savo transportu' &&
                                            <div className={colleagueNameGroupClass}>
                                                <input type="text" className="form-control" id="colleagueName" name="colleagueName" value={this.state.colleagueName} onChange={this.handleTextChange} placeholder="Nurodykite kolegos vardą ir pavardę " />
                                                <span className="help-block">{this.state.inputData.colleagueName.message}</span>
                                            </div>
                                        }
                                        <span className="help-block">{this.state.inputData.transport.message}</span>
                                    </div>
                                    <div className={arriveTimeGroupClass}>
                                        <label htmlFor="arriveTime">Planuoju atvykti</label>
                                        <ReactRadioButtonGroup
                                            options={this.arriveOptions}
                                            name="arriveTime"
                                            isStateful={true}
                                            onChange={checkedValue => this.handleRadioChange(checkedValue)}
                                            inputClassName="ledas"

                                        >
                                        </ReactRadioButtonGroup>
                                        {this.state.inputData.arriveTime.value == "Pasibaigus oficialios registracijos laikui" &&
                                            <div className={customArriveTimeGroupClass}>
                                                <input type="text" className="form-control" id="customArriveTime" name="customArriveTime" value={this.state.customArriveTime} onChange={this.handleTextChange} placeholder="Nurodykite apytikslį laiką" />
                                                {/* <label htmlFor="customArriveTime">Nurodykite apytikslį laiką</label> */}
                                                {/* <TimePicker id="customArriveTime" onChange={this.handleTimeChange} value={this.state.customArriveTime} /> */}
                                                <span className="help-block">{this.state.inputData.customArriveTime.message}</span>
                                            </div>
                                        }
                                        <span className="help-block">{this.state.inputData.arriveTime.message}</span>
                                    </div>
                                    <div className={sleepingGroupClass}>
                                        <label htmlFor="sleeping">Nakvynė</label>
                                        <ReactRadioButtonGroup
                                            options={this.allSleepingOptions}
                                            name="sleeping"
                                            isStateful={true}
                                            onChange={checkedValue => this.handleRadioChange(checkedValue)}
                                            inputClassName="ledas"
                                        >
                                        </ReactRadioButtonGroup>
                                        <span className="help-block">{this.state.inputData.sleeping.message}</span>
                                    </div>
                                    <div className={feedingGroupClass}>
                                        <label>Maitinimo poreikiai</label>
                                        <div>
                                            {this.state.inputData.feeding.value.map(feedingOption =>
                                                <div key={feedingOption.index}>
                                                    <input className="form-check-input" type="checkbox"
                                                        name={feedingOption.index}
                                                        id={feedingOption.index}
                                                        checked={feedingOption.checked}
                                                        onChange={this.handleCheckboxGroupChanged}
                                                    />
                                                    <label htmlFor={feedingOption.index}>{feedingOption.title}</label>
                                                </div>
                                            )}
                                        </div>
                                        <span className="help-block">{this.state.inputData.feeding.message}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                <div className={rulesAcceptedGroupClass}>
                                    <input className="form-check-input" type="checkbox"
                                        name="rulesAccepted"
                                        id="rulesAccepted"
                                        checked={this.state.rulesAccepted}
                                        onChange={this.handleCheckboxChange}
                                    />
                                    <label htmlFor="rulesAccepted">Sutinku, kad su manimi būtų susisiekta Saint-Gobain vasaros renginio informacijos platinimo tikslais</label>
                                    <span className="help-block">{this.state.inputData.rulesAccepted.message}</span>
                                </div>
                                <div className={safetyAcceptedGroupClass}>
                                    <input className="form-check-input" type="checkbox"
                                        name="rulesAccepted"
                                        id="rulesAccepted"
                                        checked={this.state.safetyAccepted}
                                        onChange={this.handleCheckboxChange}
                                    />
                                    <label htmlFor="rulesAccepted">Už savo saugumą renginyje esu atsakingas pats</label>
                                    <span className="help-block">{this.state.inputData.safetyAccepted.message}</span>
                                </div>
                                <br /><br /><br /><br />
                                {/* <div>
                                    <input
                                        type="submit"
                                        className="btn btn-default submit"
                                        value="Išsiųsti"
                                        onClick={this.onSave} />
                                </div> */}
                                <button className="btn btn-lg btn-primary btn-block" type="submit">Išsaugoti</button>
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