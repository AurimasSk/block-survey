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
            "Planuoju prisijungti prie kolegos, vyksiančio savo transportu",
            "Domiuosi viešojo transporto variantu",
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
        this.agreeDisagreeOptions = [
            "Sutinku",
            "Nesutinku"
        ];
        this.state = {
            showSuccessScreen: false,
            inputData: {
                firstName: { value: '', isValid: true, message: '' },
                lastName: { value: '', isValid: true, message: '' },
                workplace: { value: '', isValid: true, message: '' },
                email: { value: '', isValid: true, message: '' },
                telephone: { value: '', isValid: true, message: '' },
                transport: { value: '', isValid: true, message: '' },
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
                personDataAgreement: { value: '', isValid: true, message: '' },
                personMediaAgreement: { value: '', isValid: true, message: '' },
                safetyAccepted: { value: false, isValid: true, message: '' },
            }
        }
        this.onSave = this.onSave.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.insertNewAnswers = this.insertNewAnswers.bind(this);
        this.validateInputs = this.validateInputs.bind(this);
        this.resetValidationStates = this.resetValidationStates.bind(this);
        this.concatFeedingValues = this.concatFeedingValues.bind(this);
        this.handleCheckboxGroupChanged = this.handleCheckboxGroupChanged.bind(this);
    }

    onSave(e) {
        e.preventDefault();
        this.resetValidationStates();
        var inputValid = this.validateInputs();
        if (inputValid) {
            this.insertNewAnswers(this);
        }
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
        if (state.inputData.arriveTime.value.length == 0) {
            state.inputData.arriveTime.isValid = false;
            state.inputData.arriveTime.message = 'Prašome pasirinkti atvykimo laiką';
            this.setState(state);
            inputValid = false;
        }
        if (state.inputData.arriveTime.value == this.arriveOptions[2] &&
            state.inputData.customArriveTime.value.length == 0) {
            state.inputData.customArriveTime.isValid = false;
            state.inputData.customArriveTime.message = 'Prašome įvesti apytikslį atvykimo laiką';
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
        if (state.inputData.personDataAgreement.value.length == 0) {
            state.inputData.personDataAgreement.isValid = false;
            state.inputData.personDataAgreement.message = 'Prašome pasirinkti ar sutinkate';
            this.setState(state);
            inputValid = false;
        }
        if (state.inputData.personMediaAgreement.value.length == 0) {
            state.inputData.personMediaAgreement.isValid = false;
            state.inputData.personMediaAgreement.message = 'Prašome pasirinkti ar sutinkate';
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

    insertNewAnswers(e) {
        axios.post('/insert',
            querystring.stringify({
                firstName: e.state.inputData.firstName.value,
                lastName: e.state.inputData.lastName.value,
                workplace: e.state.inputData.workplace.value,
                email: e.state.inputData.email.value,
                telephone: e.state.inputData.telephone.value,
                transport: e.state.inputData.transport.value,
                sleeping: e.state.inputData.sleeping.value,
                arriveTime: e.state.inputData.arriveTime.value,
                customArriveTime: e.state.inputData.customArriveTime.value,
                feeding: this.concatFeedingValues(e.state.inputData.feeding.value),
                personDataAgreement: e.state.inputData.personDataAgreement.value,
                personMediaAgreement: e.state.inputData.personMediaAgreement.value,
                safetyAccepted: e.state.inputData.safetyAccepted.value
            }), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(function (response) {
                if (response && response.status != 200) {
                    alert("Įvyko klaida. Prašome pakartoti.");
                }
                else {
                    e.setState({ showSuccessScreen: true });
                }
            });
    }

    concatFeedingValues(feedingValues) {
        var concatenatedValue = "";
        feedingValues.map(value => {
            if (value.checked) {
                concatenatedValue = concatenatedValue + value.title + "; "
            }
        });

        return concatenatedValue;
    }

    handleTextChange(event) {
        const fieldName = event.target.name;
        let inputData = this.state.inputData;
        inputData[fieldName].value = event.target.value;
        return this.setState({ inputData: inputData });
    }

    handleCheckboxChange(event) {
        const fieldName = event.target.name;
        let inputData = this.state.inputData;
        inputData[fieldName].value = event.target.checked;

        return this.setState({ inputData: inputData });
    }

    handleTimeChange(time) {
        const fieldName = event.target.name;
        let inputData = this.state.inputData;
        inputData[fieldName].value = time;

        return this.setState({ inputData: inputData });
    }

    handleRadioChange(value) {
        const fieldName = event.target.name;
        let inputData = this.state.inputData;
        inputData[fieldName].value = value;
        return this.setState({ inputData: inputData });
    }

    handleCheckboxGroupChanged(event) {
        const index = event.target.name;
        let inputData = this.state.inputData;
        inputData.feeding.value.map(feedingOption => {
            if (feedingOption.index == index)
                feedingOption.checked = event.target.checked;
        })

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
        var transportGroupClass = classNames('form-group', 'minWidth', { 'has-error': !this.state.inputData.transport.isValid });
        var arriveTimeGroupClass = classNames('form-group', 'minWidth', { 'has-error': !this.state.inputData.arriveTime.isValid });
        var customArriveTimeGroupClass = classNames('form-group', { 'has-error': !this.state.inputData.customArriveTime.isValid });
        var sleepingGroupClass = classNames('form-group', 'minWidth', { 'has-error': !this.state.inputData.sleeping.isValid });
        var feedingGroupClass = classNames('form-group', 'minWidth', { 'has-error': !this.state.inputData.feeding.isValid });
        var personDataAgreementGroupClass = classNames('form-group', { 'has-error': !this.state.inputData.personDataAgreement.isValid });
        var personMediaAgreementGroupClass = classNames('form-group', { 'has-error': !this.state.inputData.personMediaAgreement.isValid });
        var safetyAcceptedGroupClass = classNames('form-group', 'minWidth', { 'has-error': !this.state.inputData.safetyAccepted.isValid });

        return (
            <div>
                <section id="contact">
                    {this.state.showSuccessScreen && <div className="centered"><h1>Ačiū, jūsų duomenys sėkmingai išsaugoti!</h1></div>}
                    {!this.state.showSuccessScreen &&
                        <div>
                            <div className="section-content">
                                <h4 className="section-header"> Saint-Gobain džiaugiasi statydami ne tik namus, bet ir kasdien tvirtėjantį ryšį su savo klientais bei partneriais. Į šią kasdien tobulinamą konstrukciją sudėję geriausius save, kviečiame jus – mūsų rimtus, pašėlusius, kūrybingus ar svajojančius draugus – užpildyti <b>Saint-Gobain MORE</b> Joninių festivalio dalyvio anketą</h4>
                            </div>
                            <div className="container contact-section">
                                <form onSubmit={this.onSave}>
                                    <div className="row">
                                        <div className="col-lg-6">
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
                                                            <label className="label-margin" htmlFor={feedingOption.index}>{feedingOption.title}</label>
                                                        </div>
                                                    )}
                                                </div>
                                                <span className="help-block">{this.state.inputData.feeding.message}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-lg-12 col-centered">
                                            <div className="form-group">
                                                <label>Svarbi informacija apie Jūsų asmens duomenų tvarkymą. Sutikimas.</label>
                                                <div className="areaClass">
                                                    <p>Informuojame, kad UAB Saint–Gobain statybos gaminiai tvarkys Jūsų aukščiau pateiktus asmens duomenis Joninių festivalio organizavimo ir būtinos komunikacijos su Jumis tikslu. Šiuos duomenis ketiname tvarkyti Jūsų sutikimo teisiniu pagrindu, todėl Jūs turite teisę nesutikti pateikti savo duomenis, tačiau tokiu atveju, mes galime nesuteikti Jums būtinų maitinimo paslaugų arba neturėti galimybės laiku pranešti svarbią informaciją. Jūsų pateikti asmens duomenys bus saugomi 2 metus po renginio.</p>
                                                    <p>Taip pat norime Jus informuoti, kad renginio metu bus filmuojama ir fotografuojama, siekiant užfiksuoti renginio akimirkas. Video ir foto medžiaga gali būti paskelbta mūsų administruojamose svetainėse ar kitose viešose vietose, įskaitant panaudojimą savo informaciniuose/reklaminiuose leidiniuose. Šiuos duomenis taip pat tvarkysime tik tuo atveju, jeigu Jūs sutiksite. Po renginio video ir foto medžiaga bus saugoma 5 metus, o po to bus sunaikinama, nebent teisės aktai nurodytų kitaip.</p>
                                                    <p>Informuojame, kad Jūs, kaip duomenų subjektas turite šias teises: susipažinti su tvarkomais asmens duomenimis, reikalauti juos ištaisyti arba ištrinti, apriboti duomenų tvarkymą, teisę į duomenų perkeliamumą, taip pat Jūs turite teisę bet kada atšaukti šį savo duotą sutikimą. Tais atvejais, jeigu įtariate, kad buvo pažeistos Jūsų teisės į privatų gyvenimą, galite kreiptis į Valstybinę asmens duomenų apsaugos inspekciją. Norėdami gauti daugiau informacijos apie savo duomenų tvarkymą, rašykite mums el. paštu Jonines@SGmore.lt.</p>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className={personDataAgreementGroupClass}>
                                                <label htmlFor="personDataAgreement">Ar sutinkate, kad <b>UAB Saint-Gobain statybos gaminiai</b> tvarkytų jūsų asmens duomenis, nurodytus anketoje, Joninių festivalio organizavimo ir būtinos komunikacijos tikslu?</label>
                                                    <ReactRadioButtonGroup
                                                        options={this.agreeDisagreeOptions}
                                                        name="personDataAgreement"
                                                        isStateful={true}
                                                        onChange={checkedValue => this.handleRadioChange(checkedValue)}
                                                        inputClassName="ledas"
                                                    />
                                                    <span className="help-block">{this.state.inputData.personDataAgreement.message}</span>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className={personMediaAgreementGroupClass}>
                                                <label htmlFor="personMediaAgreement">Ar sutinkate, kad <b>UAB Saint-Gobain statybos gaminiai</b> tvarkytų jūsų video ir foto duomenis, siekdami panaudoti juos savo informaciniuose/reklaminiuose leidiniuose?</label>
                                                    <ReactRadioButtonGroup
                                                        options={this.agreeDisagreeOptions}
                                                        name="personMediaAgreement"
                                                        isStateful={true}
                                                        onChange={checkedValue => this.handleRadioChange(checkedValue)}
                                                        inputClassName="ledas"
                                                    />
                                                    <span className="help-block">{this.state.inputData.personMediaAgreement.message}</span>
                                                </div>
                                            </div>
                                            <div className={safetyAcceptedGroupClass}>
                                                <input className="form-check-input" type="checkbox"
                                                    name="safetyAccepted"
                                                    id="safetyAccepted"
                                                    checked={this.state.safetyAccepted}
                                                    onChange={this.handleCheckboxChange}
                                                />
                                                <label className="label-margin" htmlFor="safetyAccepted">Už savo saugumą renginyje esu atsakingas pats</label>
                                                <span className="help-block">{this.state.inputData.safetyAccepted.message}</span>
                                            </div>
                                            <button className="btn btn-lg btn-primary btn-block" type="submit">Išsaugoti</button>
                                            <br />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    }
                </section>
            </div >

        )
    }
}
export default Add;