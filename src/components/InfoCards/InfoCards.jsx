import React from 'react';
import './InfoCards.css';
import FadeInOnScroll from '../FadeInOnScroll/FadeInOnScroll';
import { FaBookOpen, FaCalendarAlt } from 'react-icons/fa';

const InfoCards = () => {
  return (
    <div className="info-cards-container">
      <FadeInOnScroll direction="right" delay={100}>
        <div className="info-card">
          <div className="card-icon">
            <FaBookOpen className="icon" />
          </div>
          <h3 className="card-title">SVUIT - MMTT</h3>
          <p className="card-description">
            Một kho tài liệu học tập đa dạng và phong phú, cung cấp cho 
            sinh viên UIT một nguồn tài nguyên từ các môn đại cương đến 
            các môn cơ sở ngành và chuyên ngành.
          </p>
          <div className="card-badge">Available Now</div>
        </div>
      </FadeInOnScroll>
      
      <FadeInOnScroll direction="left" delay={200}>
        <div className="info-card">
          <div className="card-icon">
            <FaCalendarAlt className="icon" />
          </div>
          <h3 className="card-title">Planner</h3>
          <p className="card-description">
            Công cụ quản lý thời gian và lập kế hoạch học tập thông minh, 
            giúp sinh viên tối ưu hóa thời gian và nâng cao hiệu suất học tập.
          </p>
          <br />
          <div className="card-badge">Coming Soon in 2026</div>
        </div>
      </FadeInOnScroll>
    </div>
  );
};

export default InfoCards;
