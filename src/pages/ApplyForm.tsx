import Button from '@/components/Button';
import Layout from '@/components/layout/Layout';
import styled from 'styled-components';

const ApplyForm: React.FC = () => {
  return (
    <Layout>
      <h2>PT 신청</h2>
      <form>
        <div className="input-box">
          <label>시작 날짜</label>
          <input />
        </div>
        <div className="input-box">
          <label>횟수</label>
          <input />
        </div>
        <div className="input-box">
          <label>퍼스널 트레이너</label>
          <input />
        </div>
        <div className="input-box">
          <label>비용 (1회 - 5만원)</label>
          <input type="text" />
        </div>
        <Button>신청하기</Button>
      </form>
    </Layout>
  );
};

export default ApplyForm;
