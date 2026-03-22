import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { SEOHead } from '@/components/seo/SEOHead';
import { Send, Paperclip, Search } from 'lucide-react';

const conversations = [
  { id: '1', name: 'Rahul Sharma', domain: 'Product Management', lastMsg: 'See you at 3 PM tomorrow!', time: '2h ago', unread: 2, avatar: '👨‍💼', online: true },
  { id: '2', name: 'Priya Nair', domain: 'Data Science', lastMsg: 'I\'ve shared the resources.', time: '1d ago', unread: 0, avatar: '👩‍💻', online: false },
  { id: '3', name: 'Arjun Mehta', domain: 'Finance', lastMsg: 'Great session! Let me know if you have questions.', time: '3d ago', unread: 0, avatar: '👨‍🏫', online: false },
];

const messages = [
  { id: '1', from: 'expert', text: 'Hi! Looking forward to our session tomorrow.', time: '10:00 AM' },
  { id: '2', from: 'me', text: 'Me too! I\'ve prepared a list of questions.', time: '10:05 AM' },
  { id: '3', from: 'expert', text: 'Perfect. We\'ll cover your product roadmap and prioritization framework.', time: '10:07 AM' },
  { id: '4', from: 'me', text: 'See you at 3 PM tomorrow!', time: '10:10 AM' },
  { id: '5', from: 'expert', text: 'See you at 3 PM tomorrow!', time: '10:11 AM' },
];

export const PersonalMessages = () => {
  const [selected, setSelected] = useState(conversations[0]);
  const [input, setInput] = useState('');

  return (
    <>
      <SEOHead title="Messages | KIA" />
      <DashboardLayout>
        <div className="space-y-4">
          <h1 className="text-2xl font-black">Messages</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-200px)]">
            {/* Conversations List */}
            <Card className="glass-card border-white/10 flex flex-col">
              <CardContent className="p-4 flex flex-col h-full">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search conversations..." className="pl-9 bg-white/5 border-white/10" />
                </div>
                <div className="space-y-2 flex-1 overflow-y-auto">
                  {conversations.map((conv) => (
                    <div
                      key={conv.id}
                      onClick={() => setSelected(conv)}
                      className={`p-3 rounded-xl cursor-pointer transition-all ${selected.id === conv.id ? 'bg-primary-500/20 border border-primary-500/30' : 'hover:bg-white/5'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <span className="text-2xl">{conv.avatar}</span>
                          {conv.online && <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border border-background" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-sm truncate">{conv.name}</span>
                            <span className="text-xs text-muted-foreground">{conv.time}</span>
                          </div>
                          <div className="text-xs text-muted-foreground truncate">{conv.lastMsg}</div>
                        </div>
                        {conv.unread > 0 && (
                          <Badge className="bg-primary-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">{conv.unread}</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chat Window */}
            <Card className="glass-card border-white/10 md:col-span-2 flex flex-col">
              <CardContent className="p-0 flex flex-col h-full">
                {/* Header */}
                <div className="p-4 border-b border-white/10 flex items-center gap-3">
                  <span className="text-3xl">{selected.avatar}</span>
                  <div>
                    <div className="font-bold">{selected.name}</div>
                    <div className="text-xs text-muted-foreground">{selected.domain}</div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${
                        msg.from === 'me'
                          ? 'bg-primary-500 text-white rounded-br-sm'
                          : 'bg-white/10 text-foreground rounded-bl-sm'
                      }`}>
                        <p>{msg.text}</p>
                        <p className={`text-xs mt-1 ${msg.from === 'me' ? 'text-white/70' : 'text-muted-foreground'}`}>{msg.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/10 flex gap-2">
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-white/5 border-white/10"
                    onKeyDown={(e) => e.key === 'Enter' && setInput('')}
                  />
                  <Button onClick={() => setInput('')} className="bg-primary-500 hover:bg-primary-600 text-white">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};
