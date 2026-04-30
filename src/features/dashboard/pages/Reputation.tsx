import emptyPageAnimation from '@/assets/animation/emptypage.json';
import EmptyPage from '@/shared/components/EmptyPage';


export default function Reputation() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-8">DashBoard</h1>
      
      <EmptyPage
        title="No Reputation  Information Yet"
        description=""
        animationData={emptyPageAnimation}
        actionLabel="Go Back"
        onAction={() => alert("clicked")}   
      />

    </div>
  );
}