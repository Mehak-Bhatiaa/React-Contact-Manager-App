import React from 'react';
// creating functional component
const Header = () => {
    return(
        // writing jsx not simple html
        <div>
            <div className='ui container center' style={{textAlignVertical: "center",textAlign:"center", justifyContent: 'center'}}>
                <h2 style={{textAlignVertical: "center",textAlign:"center", justifyContent: 'center'}}>Contact Manager</h2>
            </div>
        </div>
    );
};

export default Header;