import React from 'react'
import Characteristic from '../components/Characteristic/Characteristic'
import "./Introduce.css"


const Introduce = () => {

  return (
    <>
    <div className='container' style={{paddingTop:"150px"}}>
      <div className='row introduce'>
        <div className='col-lg-12 col-md-12 '>
          <div className='content-introduce'>
          <div className='text-content-introduce text-items-introduce'>Welcom to KOREAN KUISINE</div>
          <p className="text-content-main1">
          Nhà hàng chúng tôi luôn luôn đặt khách hàng lên hàng đầu, tận tâm
          phục vụ, mang lại cho khách hàng những trải nghiệm tuyệt với nhất.
        </p>
            <p className='tst-text-introduce text-justify'><span>Korean Kuisine được thành lập vào năm 2024 bởi chuyên gia Joosing trẻ người Hàn Quốc.</span></p>
            <p className='tst-text-introduce text-justify'><span>Lần đầu tiên xuất hiện tại Sài Gòn với quy mô siêu nhỏ, nơi nhà sáng lập làm việc, phục vụ một cách chuyên nghiệp những món ăn tươi ngon nhất.</span></p>
            <p className='tst-text-introduce text-justify'><span>Chỉ gồm các ngon ăn độc đáo đến từ xứ sở Kimchi sẽ mang lại hương vị đặc biệt cho quý khách!</span></p>
            <p className='tst-text-introduce text-justify'><span>Nhà hàng Hàn Quốc đầu tiên tại Sài Gòn mang đến cơ hội kết hợp món mì tươi yêu thích của bạn với bất kỳ món nào bạn yêu thích, trong số các lựa chọn nước sốt tự làm của chúng tôi. Điều này đã trở thành dấu ấn của Korean Kuisine.</span></p>
          </div>
        </div>
      </div>
    </div>
    <Characteristic/>
    </>
  )
}

export default Introduce