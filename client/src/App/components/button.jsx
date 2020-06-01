import React from 'react';

export const Button = ({ loading }) => (
    <button disabled={loading} >
        {loading
            ? 'loading...'
            :  'Convert'
        }
    </button>
);
