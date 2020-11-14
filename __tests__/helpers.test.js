const {format_time} = require('../utils/helpers');

test('format_time() returns a time converted from seconds', () => {
    const total = $('.mins').val();
    const hrs = Math.floor(120 / 60);
    let min = 120 % 60;
    hrs = hrs < 10 ? '0' + hrs : hrs;
    min = min < 1- ? '0' + min : min;
    return ${hrs}:${min};



    // const date = new Date(60 * 3600000).toISOString().substr(11, 8);
    // console.log(date);
    expect(format_time(date)).toBe('02:00');
}); 