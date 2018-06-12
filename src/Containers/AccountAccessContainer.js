import React from 'react';
import { Animated } from 'react-native';
import { Actions } from 'react-native-router-flux';
import AccountAccessPresentation from '../Presentations/AccountAccessPresentation';
import allFormsValues from '../constants/allFormsValues';

export default class AccountAccessContainer extends React.Component {
  constructor() {
    super();

    const { formType } = Actions.currentParams;
    const formValues = Object.assign({}, allFormsValues[formType]);
    Object.keys(formValues.fields).forEach(fieldId => {
      formValues.fields[fieldId].value = '';
    });

    this.state = {
      fadeAnim: new Animated.Value(1),
      formType,
      formValues,
    };
  }

  postSubheader = (subheaderText) => {
    const { formValues } = this.state;
    formValues.error = true;
    formValues.subheaderText = subheaderText;
    this.setState({ fadeAnim: new Animated.Value(0), formValues }, () => {
      Animated.timing(
        this.state.fadeAnim,
        { toValue: 1, duration: 1000 },
      ).start();
    });
  };

  onFieldChange = (fieldId, updatedValue) => {
    const { formValues } = this.state;
    formValues.fields[fieldId].value = updatedValue;
    this.setState({ formValues });
  }

  onFormSubmit = () => {
    const { fields } = this.state.formValues;
    const emptyFields = Object.keys(fields).filter(fieldId => fields[fieldId].value === '');
    if (emptyFields.length > 0) this.postSubheader('Please fill all required fields');
  }

  render() {
    return (
      <AccountAccessPresentation
        fadeAnim={this.state.fadeAnim}
        formError={this.state.formError}
        formValues={this.state.formValues}
        isLoginForm={this.state.formType === 'login'}
        onFieldChange={this.onFieldChange}
        onFormSubmit={this.onFormSubmit}
        setContainerState={updatedState => { this.setState(updatedState); }}
      />
    );
  }
}