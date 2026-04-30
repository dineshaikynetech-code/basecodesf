import emptyPageAnimation from '@/assets/animation/emptypage.json';
import EmptyPage from '@/shared/components/EmptyPage';

import  newAnimation from '@/assets/animation/animation.json'


export default function ListingDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-8">DashBoard</h1>
      
      <EmptyPage
        title="No DashBoard Information Yet"
        description=""
        animationData={newAnimation}
        actionLabel="Go Back"
        onAction={() => alert("Add business clicked")}   
      />

    </div>
  );
}