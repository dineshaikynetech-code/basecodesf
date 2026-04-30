import emptyPageAnimation from '@/assets/animation/emptypage.json';   
import EmptyPage from '@/shared/components/EmptyPage';



export default function BusinessInfo() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-8">DashBoard</h1>
      
      <EmptyPage
        title="No Business Information Yet"
        description=""
        animationData={emptyPageAnimation}
        actionLabel="Go Back"
        onAction={() => alert("Add business clicked")}   
      />
      
    </div>
  );
}