type LayoutProps = {
    children: React.ReactNode;
};

const DefaultLayout: React.FC<LayoutProps> = ({children}) => {
    return(<div>
        <div>{children}</div>
    </div>)
}
export default DefaultLayout;