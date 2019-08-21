import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { Field, reduxForm } from 'redux-form';
import renderText from './renderText';
import styles from '../styles/styles';
import history from '../utils/history';
import { Button, InputAdornment, withStyles } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as crudAction from '../actions/crudAction';

const style = {
    ipscanform: styles.ipscanform,
    ipscanbtns: styles.appbar,
    normbtn: styles.normbtn
}

class IpScanForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ip: '192.168.1.1',
            port: '80',
            prefix: 'root:password',
            suffix: 'onvif'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleTest = this.handleTest.bind(this);
        this.handleScan = this.handleScan.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleTest() {
        this.props.actions.testingcam()
    };

    handleScan() {
        this.props.actions.scanningip()
    };

    handleCancel() {
        history.push('/')
    };
  
    render() {
        const { handleSubmit, onSubmit, classes } = this.props;

        return (
            <div>
                <form className={classes.ipscanform} onSubmit={handleSubmit(onSubmit)}>
                    <Field
                        label="IP Address"
                        type="text"
                        name="ip"
                        placeholder="192.168.1.x"
                        component={renderText}
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                    <br />
                    <Field
                        label="Port Number"
                        type="text"
                        name="port"
                        placeholder="e.g. 80,81,8080,80 - 8080"
                        component={renderText}
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                    <br />
                    <Field
                        label="URL Prefix"
                        type="text"
                        name="prefix"
                        placeholder="root:password"
                        component={renderText}
                        value={this.state.value}
                        onChange={this.handleChange}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">http://</InputAdornment>
                        }}
                    />
                    <br />
                    <Field
                        label="URL Suffix"
                        type="text"
                        name="suffix"
                        placeholder="onvif1"
                        component={renderText}
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                    <br />
                    <Typography component="h6">
                    Test URL: http://{this.state.prefix+'@'+this.state.ip+':'+this.state.port+'/'+this.state.suffix}
                    </Typography>
                    <br />
                    <div className={classes.ipscanbtns}>
                        <Button className={classes.normbtn} variant="contained" color="primary" type="submit" onClick={this.handleTest}>
                            Test
                        </Button>
                        <Button className={classes.normbtn} variant="contained" color="primary" type="submit" onClick={this.handleScan}>
                            Scan
                        </Button>
                        <Button className={classes.normbtn} variant="contained" color="primary" type="submit" onClick={this.handleNext}>
                            Next
                        </Button>
                        <Button className={classes.normbtn} variant="contained" color="secondary" type="button" onClick={this.handleCancel}>
                            Cancel
                        </Button>
                    </div>
                </form>     
            </div>
        );
    }
};

const validateKeyIn = values => {
    const errors = {}

    const requireFields = [
        'ip', 'port'
    ]

    requireFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'This field is required.'
        }
    })

    if (!/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(values.ip)) {
        errors['ip'] = 'Invalid IP address'    
    }

    return errors
};

IpScanForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, crudAction), dispatch)
});

export default reduxForm({
    form: 'IpScanForm',
    validate: validateKeyIn
})(connect(null, mapDispatchToProps)(withStyles(style)(IpScanForm)));