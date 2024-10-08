import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  standalone: true,
  template: `
    <div
      class="flex items-start space-x-4 p-4 rounded-lg shadow-lg bg-white mb-4"
    >
      <div
        class="bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-full"
      >
        {{
          message.user?.user?.charAt(0).toUpperCase() ||
            message.user?.charAt(0).toUpperCase()
        }}
      </div>
      <div class="flex-1">
        <div class="text-sm font-bold text-gray-700">
          {{ message.user?.user || message.user }}
        </div>
        <div class="text-gray-600 mt-1">{{ message.message }}</div>
      </div>
    </div>
  `,
})
export class MessageComponent {
  @Input() message: any;
  @Input() no: any;
}
