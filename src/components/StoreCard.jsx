import React from 'react';
import Love from '../assets/img/love.png';

const StoreCard = ({ name, type, area, likes, imgSrc }) => {
    return (
    <>
    <div className="col-6 col-lg-4">
        <div className="card card-style">
            <div className="love">
                <button type="button">
                    <img src={Love} alt="" />
                </button>
                <span>{likes}</span>
            </div>
            <div className="card-img mb-24">
                <img src={imgSrc} alt="" />
            </div>
            <div className="cardName mb-12 text-center text-lg-start">
                <span>{name}</span>
            </div>
            <div className="industry mb-6 text-center text-lg-start">
                <span className="d-none d-lg-inline">店家類型：</span><span>{type}</span>
            </div>
            <div className="area text-center text-lg-start">
                <span className="d-none d-lg-inline">地區：</span><span>{area}</span>
            </div>
        </div>
    </div>
    </>
    );
};

export default StoreCard;