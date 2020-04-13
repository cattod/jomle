import { CURRENCY } from "../../enum/Currency";

export abstract class Utility {
    static get_encode_auth(data: { username: string; password: string; }, separator: string = '_:_:_'): string {
        let username_password_str = data.username + separator + data.password;
        let hash = btoa(unescape(encodeURIComponent(username_password_str)));
        return hash;
    }

    static get_decode_auth(hash: string, separator: string = '_:_:_'): { username: string; password: string; } {
        let decode = atob(unescape(encodeURIComponent(hash)));
        let list = decode.split(separator);
        return { username: list[0], password: list[1] };
    }

    static round_num_decimals(float: number, fixed: number = 2): number {
        if (!float) return 0;
        const pfixed = Math.pow(10, fixed);
        return Math.round(float * pfixed) / pfixed;
    }

    static noRound_num_decimals(float: number, fixed: number = 2): number {
        if (!float) return 0;
        const pfixed = Math.pow(10, fixed);
        return Math.trunc(float * pfixed) / pfixed; // === parseInt(value) === ~~value
    }

    private static persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
    private static arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
    static fix_phrase_numbers(str: string) {
        if (typeof str === 'string') {
            for (var i = 0; i < 10; i++) {
                str = str.replace(this.persianNumbers[i], i.toLocaleString()).replace(this.arabicNumbers[i], i.toLocaleString());
            }
        }
        return str;
    }

    /**
     * conver second duration to timer.
     * @param second: duration in second, for example 1 hour = 3600 s.
     * @returns it return time format like 35:06:53 (minute and second alwayes <= 59 & >=0)
     */
    static second_to_timer(second: number): string {
        let hour = Math.floor(second / 3600);
        let min = Math.floor((second - (hour * 3600)) / 60);
        let sec = second - (min * 60) - (hour * 3600);

        return `${Utility.convert_oneDigitNum_to_two(hour)}:${Utility.convert_oneDigitNum_to_two(min)}:${Utility.convert_oneDigitNum_to_two(sec)}`;
    }

    private static convert_oneDigitNum_to_two(number: number): string {
        let num = number.toString();
        if (number < 10) {
            return '0' + num;
        }
        return num;
    }

    static prettifyNumber(number: number): string {
        return number.toLocaleString();
    }

    static waitOnMe(timer: number = 500): Promise<boolean> {
        return new Promise((res, rej) => {
            setTimeout(function () {
                res(true);
            }, timer);
        });
    }

    static float32Concat(first: Float32Array, second: Float32Array): Float32Array {
        const firstLength = first.length;
        const result = new Float32Array(firstLength + second.length);

        result.set(first);
        result.set(second, firstLength);

        return result;
    }

    static random_int(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    static openInNewTab(url: string): void {
        const win = window.open(url, '_blank');
        win && win.focus();
    }

    static currency_symbol(name: CURRENCY): string {
        switch (name) {
            case CURRENCY.RIAL:
                return '﷼';
            case CURRENCY.DOLLAR:
                return '$';
            case CURRENCY.POUND:
                return '£';
            case CURRENCY.EURO:
                return '€';
            default:
                return ''
        }
    }

    static makeChars(length: number): string {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

}
