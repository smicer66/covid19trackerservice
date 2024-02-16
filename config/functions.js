'use strict';

const fs = require('fs');
const path = require('path');

// Load .env configuration.
console.log(__dirname);

module.exports = {
	function convertTime(time)
	{
		x = null;
		switch (time)
		{
			case 'timer1':
				x =  '07:00';
				break;
			case 'timer2':
				x = '09:00';
				break;
		}
		return x;
	}
};