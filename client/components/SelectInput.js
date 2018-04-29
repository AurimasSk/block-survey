import React, { PropTypes } from 'react';

const SelectInput = ({ name, label, onChange, defaultOption, value, options }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <div className="field">
                {/* Note, value is set here rather than on the option - docs: https://facebook.github.io/react/docs/forms.html */}
                <select
                    name={name}
                    id={name}
                    value={value}
                    onChange={onChange}
                    className="form-control">
                    <option value="">{defaultOption}</option>
                    {options.map((option) => {
                        return <option key={option.value} value={option.value}>{option.text}</option>;
                    })
                    }
                </select>
            </div>
        </div>
    );
};

// SelectInput.propTypes = {
//     name: PropTypes.string.isRequired,
//     label: PropTypes.string.isRequired,
//     onChange: PropTypes.func.isRequired,
//     defaultOption: PropTypes.string,
//     value: PropTypes.string,
//     options: PropTypes.arrayOf(PropTypes.object)
// };

export default SelectInput;
