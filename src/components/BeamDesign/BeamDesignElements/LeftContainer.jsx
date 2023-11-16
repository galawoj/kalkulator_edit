import React, { useState } from 'react';

import styles from './BeamDesignElements.module.css';

import Geometry from './DataElements/Geometry';
import Material from './DataElements/Material';
import Load from './DataElements/Load';


const LeftContainer = () => {


    const [dataType, setDataType] = useState('geometry')


    const labelHandler = (e) => {
        setDataType(e.target.id)
    }

    return (
        <div className={styles.leftContainer}>

            <div className={styles.labels}>
                <div id={'geometry'} onClick={labelHandler} className={`${styles.label} ${dataType !== 'geometry' ? styles.inactive : ""}`}>Geometry</div>
                <div id={'material'} onClick={labelHandler} className={`${styles.label} ${dataType !== 'material' ? styles.inactive : ""}`}>Material</div>
                <div id={'load'} onClick={labelHandler} className={`${styles.label} ${dataType !== 'load' ? styles.inactive : ""}`}>Load</div>
            </div>


            <div className={styles.board}>
                {dataType === 'geometry' ? <Geometry/> : null}
                {dataType === 'material' ? <Material/> : null}
                {dataType === 'load' ? <Load/> : null}
            </div>


        </div>
    )
}
export default LeftContainer