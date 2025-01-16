import Sidebar from '../../components/common/sidebar'
import ChartArea from '../../components/chat_area'

const Dashboard = () => {
    return (
        <>
            <div className="h-screen flex flex-col">
                <div className="flex flex-1 overflow-hidden">
                    <Sidebar />
                    <ChartArea />
                </div>
            </div>
        </>
    )
}
export default Dashboard
