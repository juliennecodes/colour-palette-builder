Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :colour_palettes
  resources :colour_groups
  resources :colours
end

#          Prefix Verb   URI Pattern                             Controller#Action
# colour_palettes GET    /colour_palettes(.:format)              colour_palettes#index
#                 POST   /colour_palettes(.:format)              colour_palettes#create
#  colour_palette GET    /colour_palettes/:id(.:format)          colour_palettes#show
#                 PATCH  /colour_palettes/:id(.:format)          colour_palettes#update
#                 PUT    /colour_palettes/:id(.:format)          colour_palettes#update
#                 DELETE /colour_palettes/:id(.:format)          colour_palettes#destroy
#   colour_groups GET    /colour_groups(.:format)                colour_groups#index
#                 POST   /colour_groups(.:format)                colour_groups#create
#    colour_group GET    /colour_groups/:id(.:format)            colour_groups#show
#                 PATCH  /colour_groups/:id(.:format)            colour_groups#update
#                 PUT    /colour_groups/:id(.:format)            colour_groups#update
#                 DELETE /colour_groups/:id(.:format)            colour_groups#destroy
#         colours GET    /colours(.:format)                      colours#index
#                 POST   /colours(.:format)                      colours#create
#          colour GET    /colours/:id(.:format)                  colours#show
#                 PATCH  /colours/:id(.:format)                  colours#update
#                 PUT    /colours/:id(.:format)                  colours#update
#                 DELETE /colours/:id(.:format)                  colours#destroy