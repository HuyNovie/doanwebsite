import React from 'react'
import "./Characteristic.css"
import iconbg1 from '../../assets/Background/icon-serv-1.png'
import iconbg2 from '../../assets/Background/icon-serv-2.png'
import iconbg3 from '../../assets/Background/icon-serv-3.png'
const Characteristic = () => {
  return (
        <div className='container'>
            <div className='padding'><hr className='style-seven'></hr></div>
            <div className='row'>
                <div className='col-lg-12'>
                <div className='text-center'>
                    <div className='suptitle'>
                    <div><hr className='hr-degisn'/></div>
                    <span>Nét đặc trưng</span>
                    </div>
                    <h3 className='tst-title-text'>
                    <span>Vì sao nên chọn Korean Kuisine ?</span>
                    </h3>
                    <p className='tst-text'><span>Món ăn của chúng tôi thật sự đặc biệt và mang phong cách Hàn Quốc nổi bật</span></p>
                </div>
                </div>
            </div>  
            <div className='row index-title'>
                <div className='col-lg-4 col-md-6 col-sm-12'>
                <div className='box-content'>
                    <img src={iconbg1} className='box-img' alt='icon-background1'/>
                    <h5 className='tst-title-text'><span>Hương vị thơm ngon</span></h5>
                    <div className='tst-text'>Đặc biệt thơm ngon và phù hợp khẩu vị với tất cả các thực khách đến với Korean Kuisine</div>
                </div>
                </div>
                <div className='col-lg-4 col-md-6 col-sm-12'>
                <div className='box-content'>
                    <img src={iconbg2} className='box-img' alt='icon-background2'/>
                    <h5 className='tst-title-text'><span>Thực phẩm chất lượng</span></h5>
                    <div className='tst-text'>Đảm bảo thực phẩm sạch, các món ăn tươi ngon và đáp ứng đủ yêu cầu vệ sinh thực phẩm</div>
                </div>
                </div>
                <div className='col-lg-4 col-md-6 col-sm-12'>
                <div className='box-content'>
                    <img src={iconbg3} className='box-img' alt='icon-background3'/>
                    <h5 className='tst-title-text'><span>Đầu bếp nhiều kinh nghiệm</span></h5>
                    <div className='tst-text'>Hai đầu bếp trẻ có nhiều kinh nghiệm với những món ăn Ý đặc biệt phong phú và thơm ngon</div>
                </div>
                </div>
                <div className='padding'><hr className='style-seven'></hr></div>
            </div>
            
            </div>
  )
}

export default Characteristic