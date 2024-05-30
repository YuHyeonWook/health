import UserInfo from '@/components/UserInfo';

const MyPage = () => {
  return (
    <div>
      <UserInfo />
    </div>
  );
};

export default MyPage;

// import { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import Layout from '@/components/layout/Layout';
// import { useRecoilState } from 'recoil';
// import { userState } from '@/recoil/userState';
// import UserInfoModal from '@/components/UserInfoModal';
// import { UpdatedInfo } from '@/lib/types/mypageType';

// const LogoImg = styled.img`
//   width: 10rem;
//   height: 10rem;
//   border-radius: 50%;
//   margin-bottom: 3rem;
// `;

// const UserInfoContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   margin-top: 10rem;
// `;

// const UserInfoBox = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 2rem;
// `;

// const UserParagraph = styled.p`
//   width: 25rem;
//   height: 2.5rem;
//   display: flex;
//   align-items: center;
//   border-radius: 5px;
//   border: 1px solid #c7c7c7;
//   font-size: 1.2rem;
//   padding: 0.5rem;
// `;

// const EditBtn = styled.button`
//   padding: 0.5rem 1rem;
//   margin: 1rem 0;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   background-color: #007bff;
//   color: white;
//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const MyPage = () => {
//   const [user, setUser] = useRecoilState(userState);
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [userDetails, setUserDetails] = useState<{ birthday: string; phoneNumber: string }>({
//     birthday: '',
//     phoneNumber: '',
//   });

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     const storedUserDetails = localStorage.getItem('userDetails');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }

//     if (storedUserDetails) {
//       setUserDetails(JSON.parse(storedUserDetails));
//     }
//   }, [setUser]);

//   const handleEditClick = () => {
//     setIsModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//   };

//   const handleSaveUserInfo = (updatedInfo: { birthday: string; phoneNumber: string }) => {
//     const updatedUserDetails = { ...userDetails, ...updatedInfo };
//     setUserDetails(updatedUserDetails);
//     localStorage.setItem('userDetails', JSON.stringify(updatedUserDetails));
//   };

//   return (
//     <Layout>
//       <UserInfoContainer>
//         {user ? (
//           <>
//             <LogoImg src={user.photoURL || ''} alt="User Profile" />
//             <h2>개인정보</h2>
//             <UserInfoBox>
//               <div>
//                 이름
//                 <UserParagraph>{user.displayName}</UserParagraph>
//               </div>
//               <div>
//                 이메일
//                 <UserParagraph>{user.email}</UserParagraph>
//               </div>
//             </UserInfoBox>
//             <UserInfoBox>
//               <div>
//                 생년월일
//                 <UserParagraph>{user.birthday}</UserParagraph>
//               </div>
//               <div>
//                 전화번호
//                 <UserParagraph>{user.phoneNumber}</UserParagraph>
//               </div>
//             </UserInfoBox>
//           </>
//         ) : (
//           <p>로그인하지 않았습니다.</p>
//         )}
//         <EditBtn onClick={handleEditClick}>개인정보 수정</EditBtn>
//       </UserInfoContainer>
//       <div>
//         <h2>인바디 정보</h2>
//         <p>키:</p>
//         <p>체중: </p>
//         <p>근육량: </p>
//         <p>체지방량: </p>
//         <p>BMI: </p>
//       </div>
//       <UserInfoModal
//         isOpen={isModalOpen}
//         onClose={handleModalClose}
//         onSave={handleSaveUserInfo}
//         userDetails={userDetails}
//         user={user}
//       />
//     </Layout>
//   );
// };

// export default MyPage;

// import { useEffect, useState } from 'react';
// import { User } from 'firebase/auth';
// import styled from 'styled-components';
// import Layout from '@/components/layout/Layout';
// import UserInfoModal from '@/components/UserInfoModal';
// import { UpdatedInfo } from '@/lib/types/mypageType';
// import { readUserData } from '@/components/firebaseFunctions';
// import { userState } from '@/store/userState';
// import { useRecoilValue } from 'recoil';

// const LogoImg = styled.img`
//   width: 10rem;
//   height: 10rem;
//   border-radius: 50%;
//   margin-bottom: 3rem;
// `;

// const UserInfoContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   margin-top: 10rem;
// `;

// const UserInfoBox = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 2rem;
// `;

// const UserParagraph = styled.p`
//   width: 25rem;
//   height: 2.5rem;
//   display: flex;
//   align-items: center;
//   border-radius: 5px;
//   border: 1px solid #c7c7c7;
//   font-size: 1.2rem;
//   padding: 0.5rem;
// `;

// const EditBtn = styled.button`
//   padding: 0.5rem 1rem;
//   margin: 1rem 0;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   background-color: #007bff;
//   color: white;
//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const MyPage = () => {
//   // const [user, setUser] = useState<User | null>(null);
//   const user = useRecoilValue(userState);
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const userId = 'user-id';

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const userData = await readUserData(userId);
//       if (userData) {
//         setUser(userData);
//       }
//     };
//     fetchUserData();
//   }, [userId]);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const handleEditClick = () => {
//     setIsModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//   };

//   const handleSaveUserInfo = (updatedInfo: UpdatedInfo) => {
//     if (user) {
//       const updatedUser = { ...user, ...updatedInfo };
//       setUser(updatedUser);
//       localStorage.setItem('user', JSON.stringify(updatedUser));
//     }
//   };

//   return (
//     <Layout>
//       <UserInfoContainer>
//         {user ? (
//           <>
//             <LogoImg src={user.photoURL || ''} alt="User Profile" />
//             <h2>개인정보</h2>
//             <UserInfoBox>
//               <div>
//                 이름
//                 <UserParagraph>{user.displayName}</UserParagraph>
//               </div>
//               <div>
//                 이메일
//                 <UserParagraph>{user.email}</UserParagraph>
//               </div>
//             </UserInfoBox>
//             <UserInfoBox>
//               <div>
//                 생년월일
//                 <UserParagraph>{user.birthday}</UserParagraph>
//               </div>
//               <div>
//                 전화번호
//                 <UserParagraph>{user.phoneNumber}</UserParagraph>
//               </div>
//             </UserInfoBox>
//           </>
//         ) : (
//           <p>로그인하지 않았습니다.</p>
//         )}
//         <EditBtn onClick={handleEditClick}>개인정보 수정</EditBtn>
//       </UserInfoContainer>
//       <div>
//         <h2>인바디 정보</h2>
//         <p>키:</p>
//         <p>체중: </p>
//         <p>근육량: </p>
//         <p>체지방량: </p>
//         <p>BMI: </p>
//       </div>
//       <UserInfoModal isOpen={isModalOpen} onClose={handleModalClose} onSave={handleSaveUserInfo} user={user} />
//     </Layout>
//   );
// };

// export default MyPage;
