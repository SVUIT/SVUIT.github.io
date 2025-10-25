import React from 'react';
import './InfoCards.css';
import FadeInOnScroll from '../FadeInOnScroll/FadeInOnScroll';
import { FaBookOpen, FaCalendarAlt, FaBox } from 'react-icons/fa';

const InfoCards = () => {
  return (
    <div className="info-cards-container">
      <FadeInOnScroll direction="right" delay={100}>
        <div className="info-card">
          <div className="card-icon">
            <FaBox className="icon" />
          </div>
          <h3 className="card-title">UIT Resource Hub</h3>
          <p className="card-description">Nền tảng tổng hợp, chia sẻ và cập nhật liên tục các ưu đãi phần mềm bản quyền, công cụ học tập, tài liệu học thuật và kỹ thuật dành riêng cho sinh viên UIT.</p>
          <div className="card-badge">Available Now</div>
        </div>
      </FadeInOnScroll>
      
      <FadeInOnScroll direction="left" delay={200}>
        <div className="info-card" style={{marginLeft: '0.2rem'}}>
          <div className="card-icon">
            <FaBookOpen className="icon" />
          </div>
          <h3 className="card-title">SVUIT - MMTT</h3>
          <p className="card-description">Một kho tài liệu học tập đa dạng và phong phú, cung cấp cho sinh viên UIT một nguồn tài nguyên từ các môn đại cương đến các môn cơ sở ngành và chuyên ngành.</p>
          <div className="card-badge">Available Now</div>
        </div>
      </FadeInOnScroll>

      <FadeInOnScroll direction="right" delay={300}>
        <div className="info-card">
          <div className="card-icon">
            <FaCalendarAlt className="icon" />
          </div>
          <h3 className="card-title">Awesome  Projects</h3>
          <p className="card-description">Nơi sinh viên có thể tìm thấy các đề án, đồ án môn học, công cụ hỗ trợ, và tài liệu học tập hữu ích thuộc từng lĩnh vực Công nghệ thông tin.</p>
          <br />
          <div className="card-badge">Available Now</div>
        </div>
      </FadeInOnScroll>
    </div>
  );
};

export default InfoCards;
