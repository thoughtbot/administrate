class OrderDecorator < DecoratorBase

  STATE = %w[Alabama Alaska Arizona Arkansas California Colorado Connecticut Delaware Florida Georgia Hawaii Idaho
    Illinois Indiana Iowa Kansas Kentucky Louisiana Maine Maryland Massachusetts Michigan Minnesota Mississippi
    Missouri Montana Nebraska Nevada New Hampshire New Jersey New Mexico New York North Carolina North Dakota Ohio
    Oklahoma Oregon Pennsylvania Rhode Island South Carolina South Dakota Tennessee Texas Utah Vermont Virginia
    Washington West Virginia Wisconsin Wyoming]
  STATE_ABBR = %w[AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND
    OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY]

  def address_state
    OrderDecorator.state_by_abbr(@model.address_state)
  end

  def address
    [address_city, address_state].join(', ')
  end

  def self.state_by_abbr(abbr)
    index = STATE_ABBR.index(abbr)
    return nil unless index
    STATE[index]
  end

end
