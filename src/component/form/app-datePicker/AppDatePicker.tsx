import React from 'react';
import DatePicker from "react-datepicker";

interface IProps {
    value: number | undefined;
    onChange?: (timeStamp: number | undefined, isValid: boolean) => void
    label?: string;
    placeholder?: string;
    gregorian?: boolean;
    autoOk?: boolean;
    disable?: boolean;
    time?: boolean;
    className?: string;
};

interface IState { };

export class AppDatePicker extends React.Component<IProps, IState> {
    static defaultProps = {
        disable: false
    };

    private convert_gDate_to_timestamp(date: Date): number {
        return new Date(date).getTime() / 1000;
    }
    private convert_timestamp_to_gDate(timestamp: number): Date {
        return new Date(timestamp * 1000);
    }

    private convert_out_to_in(timestamp?: number): Date | undefined { // undefined, null
        // debugger;
        // console.log('convert_out_to_in',timestamp, this.props.label);
        /** if is NAN */
        // eslint-disable-next-line
        if (timestamp !== timestamp) return;
        if (timestamp === undefined || timestamp === null) return; //  null
        return this.convert_timestamp_to_gDate(timestamp);
    }
    private convert_in_to_out(date?: Date): number | undefined {
        // debugger
        // console.log('convert_in_to_out',date);
        if (date === undefined || date === null) return;
        return this.convert_gDate_to_timestamp(date);
    }

    private handleChange(val: Date | null) {
        if (this.props.disable) return;
        if (this.props.onChange) {
            if (val === null) this.props.onChange(undefined, this.validationFunc());
            else this.props.onChange(this.convert_in_to_out(val), this.validationFunc());
        }
    }

    private validationFunc() {
        return true;
    }

    private gregorian_render() {
        return <div className="app-datepicker-holder">
            <DatePicker
                selected={this.convert_out_to_in(this.props.value)}
                onChange={(value) => this.handleChange(value)}
                placeholderText={this.props.placeholder || ''}
                disabled={this.props.disable}
                dateFormat="yyyy/MM/dd"
                todayButton="today"
                className="app-datepicker-input"
            />
        </div>
    };

    render() {
        return (
            <div className={`form-group app-datepicker ${this.props.className}`}>
                {this.props.label ? <label>{this.props.label}</label> : <></>}
                {this.gregorian_render()}
            </div>
        )
    }
}
