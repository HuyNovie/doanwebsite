import React from 'react'
import "./Introduce.css"
import bggt from '../../assets/Background/backgroupgt.jpg'
import { Link } from "react-router-dom";
const Introduce = () => {
  return (
        <div className='container'>
        <div className='row'>
            <div className='col-lg-6 col-md-12 '>
                <div className='box-content'>
                    <img src={bggt} className='box-imgbakground' alt='icon-backgroundgt'/>
                </div>
            </div>
            <div className='col-lg-6 col-md-12'>
                <div>
                    <div className='suptitle'>
                        <hr className='hr-degisn'/>
                        <span>Giới thiệu</span>
                    </div>
                    <h3><span>Chào mừng bạn đến với Korean Kuisine</span></h3>
                    <p className='tst-text text-justify'><span>Korean Kuisine, thành lập vào năm 2024 bởi chuyên gia trẻ người Việt Nguyễn Anh Tuấn, là điểm đến ẩm thực độc đáo cho những tín đồ yêu thích hương vị tinh túy của ẩm thực Hàn. Từ khởi đầu là một quán ăn nhỏ tại Sài Gòn, Tuấn đã không ngừng nỗ lực mang đến những món ăn tươi ngon, được chế biến thủ công với sự tận tâm và chuyên nghiệp.</span></p>
                    <p className='tst-text text-justify'><span>Lần đầu tiên xuất hiện tại Sài Gòn với quy mô siêu nhỏ, nơi nhà sáng lập làm việc, phục vụ một cách chuyên nghiệp những món ăn tươi ngon nhất.</span></p>
                    <p className='tst-text text-justify'><span>Chỉ gồm các ngon ăn độc đáo đến từ xứ sở Kimchi sẽ mang lại hương vị đặc biệt cho quý khách!</span></p>
                    <p className='tst-text text-justify'><span>Nhà hàng Hàn Quốc đầu tiên tại Sài Gòn mang đến cơ hội kết hợp món mì tươi yêu thích của bạn với bất kỳ món nào bạn yêu thích, trong số các lựa chọn nước sốt tự làm của chúng tôi. Điều này đã trở thành dấu ấn của Korean Kuisine.</span></p>
                </div>
                <div style={{paddingTop :"50px"}}>
                    <Link to="/introduce" className="button-see" onClick={() => window.scrollTo(0, 0)}> 
                        <span>Xem thêm</span>
                    </Link>
                </div>
            </div>
        </div>   
            </div>
  )
}

export default Introduce