class User < ApplicationRecord

  before_save  { self.email = email.downcase }

  EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  validates :name, presence: true
  validates :email, presence: true, length: { maximum: 255 },
            uniqueness: { case_sensitive: false },
            format: { with: EMAIL_REGEX }
  validates :password, presence: true

  has_secure_password
end
