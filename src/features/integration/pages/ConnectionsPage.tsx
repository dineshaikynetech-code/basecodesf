import React from 'react';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import ResponsiveGrid from '@/shared/layouts/ResponsiveGrid';


import fbIcon from '@/assets/images/fb-icon-integration-connections.png';
import instaIcon from '@/assets/images/insta-icon-integration-connections.png';
import xIcon from '@/assets/images/x-icon-integration-connections.png';
import gmpIcon from '@/assets/images/gmp-icon-integration-connections.png';
import pinterestIcon from '@/assets/images/pinterest-icon-integration-connections.png';
import linkedinPageIcon from '@/assets/images/linkedinpage-icon-integration-connections.png';
import linkedinProfileIcon from '@/assets/images/linkedinprofile-icon-integration-connections.png';
import canvaIcon from '@/assets/images/canva-icon-integration-connections.png';
import driveIcon from '@/assets/images/drive-icon-integration-connections.png';
import tiktokIcon from '@/assets/images/tiktok-icon-integration-connections.png';
import youtubeIcon from '@/assets/images/youtube-icon-integration-connections.png';
import { LocalBusinessPageWrapper } from '@/shared/layouts/LocalBusinessPageWrapper';

const integrationOptions = [
  {
    id: 'facebook',
    name: 'Facebook Page',
    description: 'Connect your Facebook Page',
    icon: fbIcon,
    connected: '01 accounts connected',
  },
  {
    id: 'x',
    name: 'X',
    description: "Connect a X account you'd like to add",
    icon: xIcon,
    connected: '01 accounts connected',
  },
  {
    id: 'linkedin-page',
    name: 'LinkedIn Page',
    description: 'Connect your LinkedIn Page',
    icon: linkedinPageIcon,
    connected: '01 accounts connected',
  },
  {
    id: 'linkedin-profile',
    name: 'LinkedIn Profile',
    description: 'Connect your LinkedIn Profile',
    icon: linkedinProfileIcon,
    connected: '01 accounts connected',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    description: 'Connect your YouTube Channel',
    icon: youtubeIcon,
    connected: '01 accounts connected',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    description: 'Connect your Instagram Business',
    icon: instaIcon,
    connected: '01 accounts connected',
  },
  {
    id: 'gmb',
    name: 'Google Business Profile',
    description: 'Connect your Google Business Profile',
    icon: gmpIcon,
    connected: '01 accounts connected',
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    description: 'Connect your Pinterest Board',
    icon: pinterestIcon,
    connected: '01 accounts connected',
  },
  {
    id: 'canva',
    name: 'Canva',
    description: 'Connect your Canva App',
    icon: canvaIcon,
    connected: '',
  },
  {
    id: 'bitly',
    name: 'Bitly',
    description: 'Connect your Bitly URL Shortener',
    icon: pinterestIcon,
    connected: '',
  },
  {
    id: 'google-drive',
    name: 'Google Drive',
    description: 'Connect your Google Drive',
    icon: driveIcon,
    connected: '',
  },
];



const Connections: React.FC = () => {
  return (
    <LocalBusinessPageWrapper>

      <div className="px-6 pt-6 pb-2">
        <ResponsiveGrid cols={{ sm: 2, md: 3, lg: 4 }} gap={4}>
          {integrationOptions.map((item) => (
            <Card
              key={item.id}
              className="border border-border hover:shadow-md transition-all group cursor-pointer rounded-sm overflow-hidden pb-3"
            >
              <div className="flex h-full flex-col ">

                {/* TOP SECTION */}
                <div className="px-4 pb-4">
                  {/* ICON */}
                  <div className="mb-4">
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="h-8 w-8 object-contain"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="space-y-1">
                    <h3 className="text-[15px] font-semibold text-foreground pl-1">
                      {item.name}
                    </h3>


                  </div>
                </div>

                {/* BOTTOM SECTION */}
                <div className="mt-auto border-t border-border px-4 pt-3 pb-0">
                  <div className="flex items-center justify-between gap-2">
                    <Button
                      variant="outline"
                      className="h-8 rounded-md px-4 text-sm font-medium"
                    >
                      Connect
                    </Button>

                    {item.connected && (
                      <span className="text-xs font-medium text-emerald-600 whitespace-nowrap">
                        {item.connected}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </ResponsiveGrid>
      </div>
    </LocalBusinessPageWrapper>
  );
};

export default Connections;